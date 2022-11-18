const graphql = require('graphql');
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')

// schema = describing the object type 
// example = our graph have two object types on it author and books (we need to describe these two object types)


// schema file is reposnible for three things 
// one ... defining types 
// two... defining relationships 
// three... defning root queries


// importing types from graphql
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    // 2* adding a new type GraphQLInt
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


// graphql object types for Book ~
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // console.log(parent) 
                // return _.find(authors, { id: parent.authorId })
                return Author.findById(parent.authorId)

            }
        },

    })
});


// 1*creating a new type for authors as we created for books 
// graphql object types for Book ~
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        // 2* adding a new type GraphQLInt
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, { authorId: parent.id })
                return Book.find({
                    authorId: parent.id
                })

            }
        }

    })
})



// one root query to jump in autor
// one root query to grab all authors 
// one root query to jump in Book (get specific book)
// one root query to grab all Books 


// this root query to jump in Book (get specific book)
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            // when user is querying they should pass argument along for which book they are looking for 
            args: { id: { type: GraphQLID } },
            // resolve function takes two parameters parent and args
            // code to get data from db / other resource 
            resolve(parent, args) {
                // parent come into play when we are dealing with relationships between data
                // args = user passes id 123 etc we have access to these parameters inside these args

                // return _.find(books, { id: args.id });
            }
        },

        // 3*- defined author type and resolver function 
        // query for authorType ~

        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(authors, { id: args.id })
                return Author.findById(args.id)

            }
        },

        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books
                // find({}) return all object's items 
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors

                return Author.find({})
            }
        }

    }
})



const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let author = new Author // a new instance of Author
                    ({
                        name: args.name,
                        age: args.age
                    });

                return author.save();

            },
        },

        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save();

            }
        }


    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})



// Type relations 
// every book have an author 
// and every author has a collection of books

// we gonna add author id into book data , associate each book with an author
// but when we run query in author we don't really  want to send back just the author ID it will be useless to the enduser 



// ~object type 
// ~ query for object
// ~ resolver function