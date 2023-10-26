 class Carro {
    quantidadeCombustivel:number;
    capacidadeMaxima:50;

    constructor(quatidadeCombustivel:number){
        this.quantidadeCombustivel=quatidadeCombustivel
        
        
    }

    public reabastecer(combustivel: number){
        if(this.quantidadeCombustivel + combustivel > this.capacidadeMaxima){
            console.log("Capacidade máxima do tanque ultrapassada")
            return
        }
        this.quantidadeCombustivel += combustivel
    }
    
    
}
class TestaCarro {

    

    public ReabastecerSeNecessario(carro: Carro, combustivel: number){
        carro.reabastecer(combustivel)
    }

}