function redirect()
{
    var inputElements = document.getElementsByTagName("INPUT");
    console.log(inputElements);

    validateUserName(inputElements["cUsuario"]);
    validatePasswordConfirmation(
        inputElements["cSenha"],
        inputElements["cSenhaConfirmacao"]
    );
    redirectStrategy(document.getElementById("cFemi"));
}

function redirectStrategy(gender)
{
    if (gender.checked) {
        document.getElementById("fLogin").action = "mochilas_fem.html";
    }
}

function validateUserName(userName)
{
    userName.oninvalid = function(e) {
        e.target.setCustomValidity("");
        if (!e.target.validity.valid) {
            e.target.setCustomValidity("Favor, preencha o nome de usuário.");
        }
    };
    userName.setCustomValidity("");
}

function validatePasswordConfirmation(password, passwordConfirmation)
{
    if (password.value != passwordConfirmation.value) {
        passwordConfirmation.setCustomValidity(
            "Ops! A senha de confirmação está diferente da digitada."
        );
        return false;
    }
    passwordConfirmation.setCustomValidity("");
}
