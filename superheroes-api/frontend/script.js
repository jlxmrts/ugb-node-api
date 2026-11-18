
const API_URL = "http://localhost:3000/heroes";

const heroForm = document.getElementById("heroForm");
const heroesList = document.getElementById("heroesList");


async function listHeroes() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Erro ao buscar heróis.");
        }

        const heroes = await response.json();
        console.log("Heróis cadastrados:", heroes);
        heroesList.innerHTML = "";

        if (heroes.length === 0) {
            heroesList.textContent = "Nenhum herói cadastrado.";
            return;
        }

        heroes.forEach((hero) => {
            const card = document.createElement("div");

            card.className = "bg-slate-800 p-5 rounded-xl";

            const name = document.createElement("h3");
            name.className = "text-xl font-bold text-purple-400";
            name.textContent = hero.name;

            const universe = document.createElement("p");
            universe.textContent = "Universo: " + hero.universe;

            const power = document.createElement("p");
            power.textContent = "Poder: " + hero.power;
            
            const editButton = document.createElement("button");
            editButton.textContent = "Editar";
            editButton.className =
                "bg-blue-600 hover:bg-blue-700 p-2 rounded mt-3 mr-2";

            editButton.addEventListener("click", () => {
                editHero(hero);
            });

            const patchButton = document.createElement("button");
            patchButton.textContent = "Alterar poder";
            patchButton.className =
                "bg-yellow-600 hover:bg-yellow-700 p-2 rounded mt-3 mr-2";

            patchButton.addEventListener("click", () => {
                patchHero(hero);
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir";
            deleteButton.className =
                "bg-red-600 hover:bg-red-700 p-2 rounded mt-3";

            deleteButton.addEventListener("click", () => {
                deleteHero(hero.id);
            });

            card.appendChild(name);
            card.appendChild(universe);
            card.appendChild(power);
            card.appendChild(editButton);
            card.appendChild(patchButton);
            card.appendChild(deleteButton);

            heroesList.appendChild(card);
        });

    } catch (error) {
        console.error("Erro ao listar heróis:", error);
        heroesList.textContent = "Não foi possível carregar os heróis.";
    }
}


async function createHero(event) {
    event.preventDefault();

    const newHero = {
        name: document.getElementById("name").value.trim(),
        universe: document.getElementById("universe").value.trim(),
        power: document.getElementById("power").value.trim()
    };

    if (!newHero.name || !newHero.universe || !newHero.power) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newHero)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro ao cadastrar herói.");
        }

        console.log("Herói cadastrado:", data);
        alert("Herói cadastrado com sucesso!");
        heroForm.reset();
        await listHeroes();

    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        alert(error.message);
    }
}


async function editHero(hero) {
    const name = prompt("Novo nome:", hero.name);
    if (name === null) return;

    const universe = prompt("Novo universo:", hero.universe);
    if (universe === null) return;

    const power = prompt("Novo poder:", hero.power);
    if (power === null) return;

    if (!name.trim() || !universe.trim() || !power.trim()) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    const updatedHero = {
        name: name.trim(),
        universe: universe.trim(),
        power: power.trim()
    };

    try {
        const response = await fetch(`${API_URL}/${hero.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedHero)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro ao editar herói.");
        }

        console.log("Herói editado:", data);
        alert("Herói atualizado com sucesso!");
        await listHeroes();

    } catch (error) {
        console.error("Erro no PUT:", error);
        alert(error.message);
    }
}


async function patchHero(hero) {
    const power = prompt("Digite o novo poder:", hero.power);

    if (power === null) return;

    if (!power.trim()) {
        alert("O poder não pode ficar vazio!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${hero.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                power: power.trim()
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro ao atualizar poder.");
        }

        console.log("Herói atualizado parcialmente:", data);
        alert("Poder atualizado com sucesso!");
        await listHeroes();

    } catch (error) {
        console.error("Erro no PATCH:", error);
        alert(error.message);
    }
}


async function deleteHero(id) {
    const confirmDelete = confirm(
        "Deseja realmente excluir este herói?"
    );

    if (!confirmDelete) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro ao excluir herói.");
        }

        console.log("Herói excluído:", data);
        alert("Herói excluído com sucesso!");
        await listHeroes();

    } catch (error) {
        console.error("Erro no DELETE:", error);
        alert(error.message);
    }
}


heroForm.addEventListener("submit", createHero);

listHeroes();
