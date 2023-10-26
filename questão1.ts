
class Cliente {

    constructor(public nome: string, public pedidos: Pedido[] = []) {
        
    }
    
    public ProcessarPedido(pedido:Pedido,cliente:Cliente){
        var clienteService = new ClienteService
        clienteService.processarPedido(pedido,cliente)
    }
}

class Pedido {
    public valorTotal: number;
    public cliente: string;
    constructor(valorTotal: number, cliente: string) {
        this.cliente = cliente;
        this.valorTotal = valorTotal;
    }
}

export class ClienteService {

    public processarPedido(pedido: Pedido, cliente: Cliente) {
        cliente.pedidos.push(pedido)
        this.calcularDesconto(pedido)
    }
    
    private calcularDesconto(pedido: Pedido) {
        return pedido.valorTotal * 0.1;

    }
}