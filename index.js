import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import GraphqlSchema from './graphqlSchema';
import { expressPort } from './config';
import './mongooseConnection';

const server = express();
server.use(cors());

server.use('/graphql', graphqlHTTP({
  schema: GraphqlSchema,
  graphiql: true,
  formatError: error => ({
    message: error.message,
    stack: error.stack.split('\n'),
  }),
}));

server.listen(expressPort, () => {
  console.log(`The server is running at http://localhost:${expressPort}/`);
});

/*
export default {
  uri: '/business',
  schema: GraphqlSchema,
  title: 'Northwind: complex schema with 8 models 🌶🌶🌶',
  description: 'This is a sample data from YelpDataSet',
  queries: [
    {
      title: 'Self referenced Employee Type',
      query: (
        `
{
  viewer {
    employeeList {
      firstName
      subordinates {
        firstName
      }
      chief {
        firstName
      }
    }
  }
}
      `
      ),
    },
    {
      title: 'OrderConnection -> OrderDetails -> Product',
      query: (
        `
{
  viewer {
    orderConnection(first: 3) {
      count
      edges {
        node {
          orderID
          customer {
            companyName
            contactName
          }
          details {
            unitPrice
            quantity
            product {
              name
              unitsInStock
              discontinued
            }
          }
        }
      }
    }
  }
}
      `
      ),
    },
    {
      title: 'Sorting on ConnectionType by unique indexed fields',
      query: (
        `
{
  viewer {
    asc: productConnection(
      sort: PRODUCTID_ASC,
      first: 3
    ) {
      edges {
      	node {
          productID
          name
        }
    	}
    }
    desc: productConnection(
      sort: PRODUCTID_DESC,
      first: 3
    ) {
      edges {
      	node {
          productID
          name
        }
    	}
    }
    ascComplex: productConnection(
      sort: NAME__SUPPLIERID_ASC,
      first: 3
    ) {
      edges {
      	node {
          name
          supplierID
        }
    	}
    }
    descComplex: productConnection(
      sort: NAME__SUPPLIERID_DESC,
      first: 3
    ) {
      edges {
      	node {
          name
          supplierID
        }
    	}
    }
  }
}
      `
      ),
    },
    {
      title: 'Fulltext search with weights, negates term, phrase search',
      query: (
        `
{
  viewer {
    phraseSearch: employeeList(filter: {
      fullTextSearch: "\\\"fluent in French and German\\\""
    }) {
      firstName
      lastName
      title
      notes
    }
    negatesTerm: employeeList(filter: {
      fullTextSearch: "French -German"
    }) {
      firstName
      lastName
      title
      notes
    }
    wordSearch: employeeList(filter: {
      fullTextSearch: "Vice Sale"
    }) {
      firstName
      lastName
      title
      notes
    }
  }
}
      `
      ),
    },
    {
      title: 'Some crazy query',
      query: (
        `
{
  viewer {
    meatCategory: category(filter: {categoryID:6}) {
      name
      productConnection {
        edges {
          node {
            name
            supplier {
              companyName
              address {
                street
                country
                city
              }
            }
          }
        }
      }
    }
    supplier {
      supplierID
    	companyName
      contactName
      productConnection {
        count
        edges {
          node {
            name
            unitPrice
            quantityPerUnit
            category {
              name
              categoryID
              productConnection {
                count
              }
            }
          }
        }
      }
  	}
    p1: product {
      name
      productID
    }
    p2: product(skip: 2) {
      name
      productID
      orderConnection {
        count
        edges {
          node {
            customer {
              companyName
              contactName
        			contactTitle
              orderConnection {
                count
                edges {
                  node {
                    shipVia
                    shipper {
                      companyName
                      orderConnection(first: 1, sort: _ID_DESC) {
                        count
                        edges {
                          node {
                            freight
                      	  }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    p3: product(skip: 1) {
      name
      productID
    }
    categoryList(limit: 3) {
      name
      description
      productConnection(first: 1) {
        count
        edges {
          node {
            name
            unitPrice
            discontinued
          }
        }
      }
    }
  }
}
      `
      ),
    },
  ],
};
*/