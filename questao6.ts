interface Totalizavel {
    calcularTotal(): number 
}

class Item {
    id:number;
    descrição:string;
    valor:number;

    getID(){
        return this.id
    }
    getDescricao(){
        return this.id
    }
    getValor(): number{
        return this.id
    }
}

class Produto extends Item implements Totalizavel{
    taxa:number;
calcularTotal(): number {
   return this.valor * (1 + this.taxa)
}

}
class Servico extends Item implements Totalizavel {
    horas:number;
calcularTotal(): number {
   return this.valor * this.horas
    
}

}
class Doacao extends Item implements Totalizavel {
    bonus:number;
calcularTotal(): number {
   return this.valor + this.bonus
    
}

}

class Totalizacao{

    constructor(doacao:Doacao,servico:Servico,produto:Produto){
        
    }
    totalizar(totalizavel:Totalizavel[]) { 
        
       totalizavel.forEach(Item => Item.calcularTotal())
}
}
