window.addEventListener('load',()=>{
    function mainLogin(){
        const form = document.querySelector('form')
        form.addEventListener('submit',realizaLogin)
    }
    async function realizaLogin(evento){
        evento.preventDefault()
        const email = document.getElementById('usuario')
        const senha = document.getElementById('senha')

        const reqBody = {
            usuario: email.ariaValueMax,
            senha: senha.value
        }
       const resposta =  await fetch('http://localhost:3000/api/login', { 
            method: "POST", 
            headers: {
                "Contente-Type": "application/json"
            }, 
            body: JSON.stringify(reqBody)
         })
         if(resposta.status === '200'){
            console.log("ok");
            const respostaParseada = await resposta.json()
            console.log(respostaParseada.token)
            localStorage.setItem("token", respostaParseada.token)
            //redireciona para pagina inicial salva token no losalstorage

            window.location.href = "/"
         }else{
            console.log("erro");
            const p  = document.getElementById('mensagemErro')
            p.textContent = 'usuario/senha incorreto'
         }
    }
})
