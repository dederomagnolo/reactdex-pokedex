const fetch = require('isomorphic-fetch');
const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const _ = require ('lodash');

// var pokemonResponse = fs.readFileSync('./pokemon-response.json');
// pokemonResponse = JSON.parse(pokemonResponse);

const PORT = 5000;

var pokeRequests = [];

for(var pokeID = 1; pokeID < 400; pokeID++){
    let baseURL = 'https://pokeapi.co/api/v2/pokemon/' + pokeID;

    fetch(baseURL, {
        method: 'get',
        headers: {
            "Content-Type": "application/json"
        }

    }).then(response => response.json())
        .then(json => {

            let pokemon = {
                id: json.id,
                name: json.name,
                sprite: json.sprites.front_default,
                spriteBack: json.sprites.back_default
            }
            pokeRequests.push(pokemon);

            pokeRequests = _.orderBy(pokeRequests, 'id', 'asc');
            console.log(pokeRequests);
        });
}

// const eevolutions = [
//     {
//         name: 'Leafeon',
//         type: 'Grass',
//     },
//     {
//         name: 'Flareon',
//         type: 'Fire',
//     },
//     {
//         name: 'Jolteon',
//         type: 'Electric',
//     },
//     {
//         name: 'Vaporeon',
//         type: 'Water',
//     },
//     {
//         name: 'Glaceon',
//         type: 'Ice',
//     },
//     {
//         name: 'Umbreon',
//         type: 'Dark',
//     },
//     {
//         name: 'Espeon',
//         type: 'Psychic',
//     },
// ];



const typeDefs = gql`

    type Pokemon {
        id: String
        name: String
        sprite: String
        spriteBack: String
    }

#    type Pokemon {
#        name: String
#        url: String
#    }
    
    type Query {
        
        pokemon: [Pokemon]
    }
`;



const resolvers = {

    Query: {
        pokemon: () => pokeRequests
        //pokemon: () => pokemonResponse,
    }
};


const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen(2020).then(( {url} ) => {
    console.log(url);
});
