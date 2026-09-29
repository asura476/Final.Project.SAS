//------------------------------------------------------------------------
// THE OBJECT
// -----------------------------------------------------------------------
const candidats = [
    {
	    cin : "AB123456",
	    nom : "Boushaba",
	    prenom : "Soufiane",
	    partiPolitique : "Indépendant",
	    age: 40,
	    electeurs: ["LA984515", "JA985181"]
    },
    {
	    cin : "HA123456",
	    nom : "Abounacer",
	    prenom : "Aymane",
	    partiPolitique : "Gamers",
	    age: 18,
	    electeurs: ["KA83681"]
    },
    {
	    cin : "WA123456",
	    nom : "Lakbiri",
	    prenom : "Ismail",
	    partiPolitique : "Gamers",
	    age: 22,
	    electeurs: ["KA83681"]
    }
];
//-------------------------------------------------------------------------
// THE HEADER
//-------------------------------------------------------------------------
function showmenu()
{
console.log(`
----------------------------------------------
        THE FUTURE IS IN YOUR HANDS
              BE RESPONSIBLE
----------------------------------------------    
        1 --> ADD A CANDIDATE
        2 --> SHOW LIST OF CANDIDATES
        3 --> VOTE
        4 --> MODIFY INFORMATION
        5 --> DELETE A CANDIDATE
        6 --> SEARCH FOR A CANDIDATE
        7 --> STATISTICS
        0 --> EXIT
        (IMPORTANT NOTICE!!!) ==> RESPECT CAPITALISATION!!
    `)
}
//--------------------------------------------------------------------------
// PROMPT-SYNC
//--------------------------------------------------------------------------
const ps = require('prompt-sync')()
//--------------------------------------------------------------------------
// THE SWITCH CASES
//--------------------------------------------------------------------------
let working = true
while(working)
{
    showmenu()
    let num = ps("choose a number: ")
switch (num)
{
    case "1":
        console.log(`
            1 --> add one candidate
            2 --> add multiple candidates
            0 --> return`)
            let ajout = +ps("choose a number: ")
        switch(ajout)
        {
            case 1:
                addOneCandidate()
                break;
            case 2:
                addMultiple()
                break;
            case 0:
                break;
        }
        break;
    case "2":
        console.log(`
            1 --> display all candidates
            2 --> sorted display (most votes to least)
            3 --> filtered display (by political party)
            0 --> return`)
            let affiche = +ps("choose a number: ")
            switch(affiche)
            {
            case 1:
                AfficherCandidat()
                break;
            case 2:
                console.log(afficherParTri())
                break;
            case 3:
                afficherparfilter()
                break;
            case 0:
                break;
            }     
        break;
    case "3":
        voter()
        break;
    case "4":
        modifyCandidate()
        break;
    case "5":
        deleteCandidate()
        break;
    case "6":
        searchForCandidate()
        break;
    case "7":
        statistics()
        break;
    case "0":
        working = false;
        console.log("FARWELL")
        break;
    default:
            console.log("invalid option")
        break;
}
}
//----------------------------------------------------------------------------------------------
//THE ADD FUNCTION------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
function addOneCandidate()
{
    let exist = false
    let cin = ps("type the CIN of the candidate you want to add: ")
    for (let i = 0; i < candidats.length; i++)
    {
        if(candidats[i].cin === cin)
        {
            exist = true
        }
    }
    if (exist)
    {
        console.log("this candidate already exists")
        return;
    }
    let name = ps("enter the name: ")
    let lastname = ps("enter the lastname: ")
    let party = ps("enter the political party: ")
    let age = +ps("enter the age: ") 
    candidats[candidats.length] = 
    {
        cin : cin,
        nom : name,
        prenom : lastname,
        partiPolitique : party,
        age : age,
        electeurs : []
    };
    console.log("you have successfully added a candidate")
}
function addMultiple()
{
    let number = +ps("how many candidates do you want to add: ")
    for (let i = 0; i < number; i++)
    {
        console.log("candidate number: " + (i + 1))
        addOneCandidate()
    }
}
//-------------------------------------------------------------------------
// THE SHOW FUNCTIONS
//-------------------------------------------------------------------------
function AfficherCandidat()
{
    for(let i = 0; i < candidats.length; i++)
    {
        console.log(candidats[i].nom  + " " + candidats[i].prenom)
    }
}

function afficherParTri()
{
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < candidats.length - 1; i++) {
      if (candidats[i].electeurs.length < candidats[i + 1].electeurs.length) {
        let temp = candidats[i + 1]
        candidats[i + 1] = candidats[i]
        candidats[i] = temp
        swapped = true;
      }
    }
  } while (swapped);
  return candidats.map(candidats => candidats.nom);
}
function afficherparfilter()
{   let verifi = false   
    let parti = ps(
        "enter the party you wanna filter with: ").trim()
    for (let i = 0; i < candidats.length; i++)
    {
            if(candidats[i].partiPolitique === parti)
                {
                    console.log(candidats[i].nom + " " + candidats[i].prenom)
                    verifi = true
                }
    }
    if(!verifi)
    {
        console.log("a mistake has been made")
    } 
}
//----------------------------------------------------------------------------
//THE VOTING FUNCTION
//----------------------------------------------------------------------------
function voter()
{
    let cinElecteur = ps("entrez votre CIN: ").trim();
    let votebefore = false;
    for(let i = 0; i < candidats.length; i++)
    {
        for(let j = 0; j < candidats[i].electeurs.length; j++)
        {
            if(candidats[i].electeurs[j] === cinElecteur)
            {
                votebefore = true;
                break;
            }
        }
    }
    if (votebefore)
    {
        console.log("you already voted")
        return
    }
    let cincandidate = ps("enter the CIN of the candidate you wish to vote for: ").trim()
    let candidate = null;
    for (let i = 0; i < candidats.length; i++)
    {
        if(candidats[i].cin === cincandidate)
        {
            candidate = candidats[i]
            break;
        }
    }
    if (candidate !== null)
    {
        candidate.electeurs[candidate.electeurs.length] = cinElecteur
        console.log('Your vote has been added succesfully')
    }
}
//--------------------------------------------------------------------------
//THE MODIFY FUNCTION
//--------------------------------------------------------------------------
function modifyCandidate()
{
    let cin = ps("enter the CIN of the candidate you wanna modify: ").trim();
    for(let i = 0; i < candidats.length; i++)
    {
        if(candidats[i].cin === cin)
        {
            console.log(`
                1 --> modify political party
                2 --> modify age`)
                let choice = +ps("enter your choice: ")
                if(choice === 1)
                {
                    candidats[i].partiPolitique = ps("new party: ")
                    console.log("party modified successfully")
                }
                else if (choice === 2)
                {
                    let modifiedAge = +ps("enter new age: ")
                    if(!isNaN(age) && age >= 18)
                        {
                            candidats[i].age = modifiedAge
                            console.log("age updated successfully")
                        }
                        else
                        {
                            console.log("invalid age")
                        }
                }
                return;
        }
    }
    console.log("candidate is non-existent")
}
//------------------------------------------------------------------------------------
//THE DELETING FUNCTION---------------------------------------------------------------
//------------------------------------------------------------------------------------
function deleteCandidate()
{
    let cin = ps("enter the CIN of the candidate you want to delete: ").trim()
    let ind = -1

    for (let i = 0; i < candidats.length; i++)
    {
        if (candidats[i].cin === cin)
        {
            ind = i
            break;
        }
    }
    if (ind !== -1)
    {
        for(let i = ind; i < candidats.length - 1; i++)
        {
            candidats[i] = candidats[i + 1]
        }
        candidats.length = candidats.length - 1
        console.log("candidate deleted successfully")
    }
    else
    {
        console.log("candidate is non-existent")
    }
}
//-------------------------------------------------------------------------------------------
//THE SEARCHING FUNCTION
//-------------------------------------------------------------------------------------------
function searchForCandidate()
{
    canName = ps("enter the name of the candidate you want to search for: ")
    let result = [];
    for(let i = 0; i < candidats.length; i++)
    {
        if(candidats[i].nom === canName)
        {
            result[result.length] = candidats[i]
        }
    }
    if(result.length === 0)
    {
        console.log("no match in canidates")
    }
    else
    {
        for(let i = 0; i < result.length; i++)
        {
            let c = result[i]
            console.log("CIN: " + c.cin + "/ name: " + c.nom + "/ lastname: " + c.prenom + "/ party: " + c.partiPolitique)
        }
    }
}
//-----------------------------------------------------------------
//THE STATISTICS---------------------------------------------------
//-----------------------------------------------------------------
function statistics()
{
    console.log("the number of candidates: " + candidats.length)
    console.log("-----------------------------------------------------")

    let totalvotes = 0
    for (let i = 0; i < candidats.length; i++)
    {
        totalvotes += candidats[i].electeurs.length
    }
    console.log("total number of voters is " + totalvotes)
    console.log("------------------------------------------------------")

    let copy = []
    for (let i = 0; i < candidats.length; i++)
    {
        copy[i] = candidats[i]
    }
    let swapped;
  do {
    swapped = false
    for (let i = 0; i < candidats.length - 1; i++) {
      if (copy[i].electeurs.length < copy[i + 1].electeurs.length) {
        let temp = copy[i + 1]
        copy[i + 1] = copy[i]
        copy[i] = temp
        swapped = true;
      }
    }
  } while (swapped);
  console.log("names of top 3 candidates in terms of votes: " + copy.splice(0, 3).map(c => (c.nom + " " + c.prenom)));
}