
//global var dec
 var mySQL = require("mysql");
var inquirer = require("inquirer");
var con = mySQL.createConnection(
{
    host: "localHost",
    port: 3306,
    user: "root",
    password: "00790086",
    database: "bamazon"
});

function conCallback(err) //callback function defintion for connection method 
{
    if(err) throw err;

    storeFront();
}

function choicesFunc(res)  //function definition for inquierer logic - parameter is intial MySQL query result
{
    var choices = [];
    for(var i = 0; i < res.length; i++)
        choices.push(res[i].product_name)

    return choices;
}


function storeCallback(err, res) //callback function definition for intial sql query
{

    if(err) throw err;

    inquirer
        .prompt([
            {
                name: "selection",
                type: "rawlist",
                message: "Choose what to buy:",
                choices: choicesFunc(res)  
            },
            {
                name: "quantity",
                type: "input",
                message: "Enter how much of the product do you want to buy:"
            }
        ]).then(function(answer){

            var choice;
            for(var i = 0; i < res.length; i++){
                if(res[i].product_name == answer.selection) choice = res[i];}


            console.log("CHOICE: " + choice.stock_quantity);
            console.log("ANSWER: " + answer.quantity);
            if(choice.stock_quantity > Number(answer.quantity))
            {
                con.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        { stock_quantity : choice.stock_quantity - answer.quantity },
                        {item_id : choice.item_id}
                    ],
                    function(err)
                    {
                        if(err) throw err;

                        var finalTotal = choice.price * answer.quantity;

                        console.log("\n\nOrder fulfilled!\n\nSign-up for Bamazon Odd for free shipping!\n\nFinal price is " + finalTotal + "\n\n");
                        returnOrLoop();
                    }
                    );//end query
            }//end if there is stock
            else{
                    console.log("\n\nWE'RE SOLD OUT!\n\nDOLLA DOLLA BILLS Y'ALL!\n\n$$$$$$$\n\n");
                    returnOrLoop();
            }//end else not enough stock
        });
}

function returnOrLoop() //function for letting the user continue shopping or to end their session
{
    inquirer
        .prompt([

            {
                type: "list",
                message: "Continue shopping?",
                name: "decision",
                choices: ['yes', 'no']
            }
        ]).then(function(answer){

            console.log(answer);
            if(answer.decision == "yes") storeFront();
            else con.end();

        });
}

function storeFront()  //launches store front
{
    con.query("SELECT * FROM products", storeCallback);
}

//////////    main       ////////////////

con.connect(conCallback);




