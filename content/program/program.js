const buscar = () =>
{
    const pokemonABuscar = document.getElementById("txtPokemon");
    let pokemon = pokemonABuscar.value;
    pokemon = pokemon.toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    fetch(url).then
    (
        (res) => 
        {
            if (res.status != "200") // 200 = ok
            {
                pokeImage("./content/images/noEncontrado.png")
                document.getElementById("nombre").innerHTML = "";
                document.getElementById("tipo").innerHTML = "";
                document.getElementById("estadisticas").innerHTML = "";
                document.getElementById("movimientos").innerHTML = "";
            }
            else 
            {
                return res.json();
            }
        }
    ).then
    (
        (data) => 
        {
            if (data) 
            {
                let pokeImg = data.sprites.front_default;
                pokeImage(pokeImg);
                
                console.log(data.forms[0].name);
                document.getElementById("nombre").innerHTML = data.forms[0].name;
                console.log(data.types[0].type.name);
                document.getElementById("tipo").innerHTML = data.types[0].type.name;
                let estadistica = "";
                for(let i=0; i<data.stats.length; i++)
                {
                    console.log(data.stats[i].stat.name + ': ' + data.stats[i].base_stat);
                    document.getElementById("estadisticas").innerHTML = "";
                    estadistica += data.stats[i].stat.name + ": " + data.stats[i].base_stat + "\n";
                    document.getElementById("estadisticas").innerHTML = estadistica;
                } 
                let movimientos = "";
                document.getElementById("movimientos").innerHTML = movimientos;
                for(let i=0; i<data.moves.length; i++)
                {
                    let movimiento = data.moves[i].move.name;
                    document.getElementById("movimientos").innerHTML += movimiento + " - ";
                    /*
                    fetch("https://pokeapi.co/api/v2/move/" + movimiento).then
                    (
                        (result) =>
                        {
                            if(result.status != 200)
                            {
                                console.log("_err_");
                            }
                            else
                            {
                                result.json().then
                                (
                                    (data) => 
                                    {
                                        const textoCompleto = data.flavor_text_entries.filter
                                        (
                                            (element) => element.language.name == "es"
                                        );
                                        if(textoCompleto[0].flavor_text.length > 0)
                                        {
                                            console.log("\n" + movimiento + ": " + textoCompleto[0].flavor_text + "\n");
                                            document.getElementById("movimientos").innerHTML = "";
                                            movimientos += "\n" + movimiento + ": " + textoCompleto[0].flavor_text + "\n";
                                            document.getElementById("movimientos").innerHTML = movimientos;
                                        }
                                    }
                                );
                            }
                        }
                    );
                    */
                }
            }
        }
    );
}

const pokeImage = (url) => 
{
    const pokePhoto = document.getElementById("pokebola");
    pokePhoto.src = url;
}