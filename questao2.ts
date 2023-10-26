class RedeSocial {
    public postarMensagem(mensagem: string){
        if(mensagem !== null || mensagem !== ""){

            console.log(`A postada: ${mensagem}`)
            return
        }

        console.log("Erro: mensagem vazia não pode ser postada")
    }
}