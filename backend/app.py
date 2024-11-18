import json
import os
import sqlite3

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route("/", methods=["GET"])
def hello_world():
    return "Hello, World!"

# GET /api/v1/books - returns a list of all books


@app.route('/api/v1/books', methods=['GET'])
def get_books():
    page = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=9, type=int)

    books = get_all_books(page=page, page_size=page_size)

    # Adiciona a contagem total de livros
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()
    cursor.execute('SELECT COUNT(*) FROM book;')
    total_books = cursor.fetchone()[0]
    conn.close()

    return jsonify({
        'books': books,
        'total': total_books
    })


# GET /api/v1/books/author/<author> - returns a list of all books by the given author

@app.route('/api/v1/books/author/<author_slug>', methods=['GET'])
def get_books_by_author(author_slug):
    page = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=9, type=int)
    offset = (page - 1) * page_size

    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM book WHERE author_slug LIKE ? LIMIT ? OFFSET ?;', (f'%{author_slug}%', page_size, offset))
    books = cursor.fetchall()

    cursor.execute('SELECT COUNT(*) FROM book WHERE author_slug LIKE ?;', (f'%{author_slug}%',))
    total_books = cursor.fetchone()[0]

    book_list = [{'id': book[0], 'title': book[1], 'author': book[2], 'biography': book[4]} for book in books]
    conn.close()
    return jsonify({
        'books': book_list,
        'total': total_books
    })

# GET /api/v1/books/subject/<subject_slug> - returns a list of all books by the given subject


@app.route('/api/v1/books/subjects', methods=['GET'])
def get_books_by_subject():
    return jsonify(get_books_by_subject())

# GET /api/v1/books/subjects/<subject_slug> - returns a list of books by the given subject


@app.route('/api/v1/books/subjects/<subject>', methods=['GET'])
def books_by_subject_slug(subject):
    return jsonify(get_books_by_subject_slug(subject))

# GET /api/v1/authors - returns a list of all authors


@app.route('/api/v1/authors', methods=['GET'])
def get_all_authors():
    return jsonify(get_authors())


# DELETE /api/v1/books/<book_id> - deletes the book with the given ID

@app.route('/api/v1/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Execute uma query para deletar o livro com o ID fornecido
    cursor.execute('DELETE FROM book WHERE id = ?;', (book_id,))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Book deleted successfully.'}), 200


# GET /api/v1/books/title/<title> - returns a list of books with titles that match the given search term

@app.route('/api/v1/books/title/<title>', methods=['GET'])
def get_books_by_title(title):
    page = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=9, type=int)
    offset = (page - 1) * page_size

    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM book WHERE title LIKE ? LIMIT ? OFFSET ?;', (f'%{title}%', page_size, offset))
    books = cursor.fetchall()

    cursor.execute('SELECT COUNT(*) FROM book WHERE title LIKE ?;', (f'%{title}%',))
    total_books = cursor.fetchone()[0]

    book_list = [{'id': book[0], 'title': book[1], 'author': book[2], 'biography': book[4]} for book in books]
    conn.close()
    return jsonify({
        'books': book_list,
        'total': total_books
    })


# POST /api/v1/books - creates a new book

@app.route('/api/v1/books', methods=['POST'])
def create_book():

    # Get the book data from the request body
    book_data = request.get_json()

    return jsonify(create_new_book(book_data))


def get_all_books(page=1, page_size=9):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Calculate the offset based on the page number and page size
    offset = (page - 1) * page_size

    # Execute a SELECT query with pagination
    cursor.execute(f'SELECT * FROM book LIMIT {page_size} OFFSET {offset};')
    books = cursor.fetchall()

    # Convert the books data to a list of dictionaries
    book_list = []
    for book in books:
        book_dict = {
            'id': book[0],
            'title': book[1],
            'author': book[2],
            'biography': book[4]
        }
        book_list.append(book_dict)

    # Close the database connection
    conn.close()

    # Return the books as a JSON response
    return book_list


def get_authors():
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Execute a SELECT query to fetch all authors
    cursor.execute('SELECT * FROM author;')
    authors = cursor.fetchall()

    author_list = []

    for author in authors:
        author_dict = {
            'id': author[0],
            'title': author[1],
            'slug': author[2],
            'biography': author[3]
        }
        author_list.append(author_dict)

    # Close the database connection
    conn.close()

    # Return the authors as a JSON response
    return author_list


def get_books_by_author_name(author_slug):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Execute a SELECT query to fetch all books by the given author
    cursor.execute(
        'SELECT * FROM book WHERE author_slug = ?;', (author_slug,))
    books = cursor.fetchall()

    # Convert the books data to a list of dictionaries
    book_list = []

    for book in books:
        book_dict = {
            'id': book[0],
            'title': book[1],
            'author': book[2],
            'biography': book[4],
            'authors': book[5],
            'publisher': book[12],
            'synopsis': book[21],
        }
        book_list.append(book_dict)

    # Close the database connection
    conn.close()

    # Return the books as a JSON response
    return book_list


def get_books_by_subject():
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Execute a SELECT query to fetch all subjects, and the slug from the table subject

    cursor.execute("SELECT subjects FROM book;")
    subjects = cursor.fetchall()

    conn.close()

    return subjects


def get_books_by_subject_slug(subject):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    query = '''
    SELECT title, author, author_slug, author_bio, authors, publisher, synopsis
    FROM book
    WHERE subjects = ?
    '''

    # Execute a SELECT query to fetch all books by the given subject
    cursor.execute(query, (subject,))
    books = cursor.fetchall()

    # Convert the books data to a list of dictionaries
    book_list = []

    for book in books:
        book_dict = {
            'title': book[0],
            'author': book[1],
            'slug': book[2],
            'biography': book[3],
            'authors': book[4],
            'publisher': book[5],
            'synopsis': book[6],
        }
        book_list.append(book_dict)

    # Close the database connection
    conn.close()

    # Return the books as a JSON response
    return book_list


def create_new_book(book_data):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Get the book data from the request body
    title = book_data['title']
    author = book_data['author']
    author_slug = book_data['author_slug']
    author_bio = book_data['author_bio']
    authors = book_data['authors']
    publisher = book_data['publisher']
    synopsis = book_data['synopsis']

    # Execute a query to create a new book
    cursor.execute('INSERT INTO book (title, author, author_slug, author_bio, authors, publisher, synopsis) VALUES (?, ?, ?, ?, ?, ?, ?);',
                   (title, author, author_slug, author_bio, authors, publisher, synopsis))

    # Commit the changes to the database
    conn.commit()

    # Close the database connection
    conn.close()

    # Return a message to the user
    return {'message': 'Book created successfully.'}, 201


# # GET /api/v1/books
# @app.route("/api/v1/books", methods=["GET"])
# def get_books():

#     conn = sqlite3.connect('db.sqlite')
#     cursor = conn.cursor()

#     # Execute a SELECT query to fetch all books
#     cursor.execute('SELECT * FROM book;')
#     books = cursor.fetchall()

#     # Convert the books data to a list of dictionaries
#     book_list = []
#     for book in books:
#         book_dict = {
#             'id': book[0],
#             'title': book[1],
#             'author': book[2],
#             'year': book[3],
#             'genre': book[4]
#         }
#         book_list.append(book_dict)

#     # Close the database connection
#     conn.close()

#     # Return the books as a JSON response
#     return jsonify(book_list)

# # GET /api/v1/authors

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)