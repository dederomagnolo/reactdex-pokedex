import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { Item , Image , Segment , Divider , Grid, Reveal} from 'semantic-ui-react';

const client = new ApolloClient({
    uri: 'http://localhost:2020/',
});


function SpritePokemon(){

    const POKE_QUERY = gql`
        {
            pokemon {
                id
                name
                sprite
                spriteBack
            }
        }
    `
    const { loading, error, data } = useQuery(POKE_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (

        <Item.Group>
            <Grid columns={6}>
            {data.pokemon.map(pokemon => (
                <Grid.Column>
                    <Segment>
                        <Item>

                            <Reveal active animated='fade' disabled>
                                <Reveal.Content visible>
                                    <Image src={pokemon.sprite} />
                                </Reveal.Content>
                                <Reveal.Content hidden>
                                    <Image src={pokemon.spriteBack} />
                                </Reveal.Content>
                            </Reveal>

                            <Item.Content>
                                <Item.Header as='a'>{pokemon.name}</Item.Header>
                                <Item.Description>
                                    # {pokemon.id}
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Segment>
                </Grid.Column>
            ))}
        </Grid>
        </Item.Group>

    );
}


const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h2>pokeApollo app 🚀</h2>

            <SpritePokemon />

        </div>
    </ApolloProvider>
);

export default App;