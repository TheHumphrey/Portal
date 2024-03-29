export interface IDashboardData{
    //lucro
    lucroBruto: number;
    lucroDesconto: number;

    //tempo
    tempoEntrega: number;
    tempoRota: number;
    tempoSemanal: number;

    //km Media
    kmDiario: number;
    kmSemanal: number;
    kmMensal: number;

    //Custo Media
    custoDiario: number;
    custoSemanal: number;
    custoMensal: number;

    //frota
    frotaDisponivel: number;
    frotaManutencao: number;
    frotaIndisponivel: number;

}