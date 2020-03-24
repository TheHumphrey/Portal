import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../../services/dashboard/dashboard.service'
import { IDashboardChart } from 'src/app/models/dashboard/dashboardChart.model';
import { IDashboardData } from 'src/app/models/dashboard/dashboardDataAll.model';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dataChart: IDashboardChart = { 
    email: "", 
    entregues: 1, 
    andamento: 1, 
    naoEntregues: 1 
  };
  dataAll: IDashboardData = { 
    lucroBruto: 0, 
    lucroDesconto: 0, 
    tempoEntrega: 0, 
    tempoRota: 0, 
    tempoSemanal: 0, 
    kmDiario: 0, 
    kmSemanal: 0, 
    kmMensal: 0, 
    custoDiario: 0, 
    custoSemanal: 0, 
    custoMensal: 0, 
    disponivelFrota: 0, 
    manutencaoFrota: 0, 
    indisponivelFrota: 0
  };

  constructor(private dash: DashboardService) { }

  ngOnInit(): void {
    this.loadDataDash();
    if (typeof (google !== 'undefined')) {
      google.charts.load('current', { 'packages': ['corechart'] });
      this.dash.loadData().subscribe(res => this.dataChart = res.body)
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.loadDrawn());
      }, 1000)
    }
  }

  loadDrawn() {
    this.entregasChart();
    this.PrazoChart()
    this.SatisfacaoChart()
  }

  entregasChart() {
    var dataGoogle = google.visualization.arrayToDataTable([
      ['Status', 'Quantidade'],
      ['Entregue', this.dataChart.entregues],
      ['Andamento', this.dataChart.andamento],
      ['Não entregues', this.dataChart.naoEntregues]
    ])
    var chart = new google.visualization.PieChart(document.getElementById('chartEntregas'));
    chart.draw(dataGoogle, this.dash.loadOptionsEntrega());
  }

  SatisfacaoChart() {
    var dataGoogle = google.visualization.arrayToDataTable([
      ['Status', 'Quantidade'],
      ['Entregue', this.dataChart.entregues],
      ['Andamento', this.dataChart.andamento],
      ['Não entregues', this.dataChart.naoEntregues]
    ])
    var chart = new google.visualization.PieChart(document.getElementById('chartSatisfacao'));
    chart.draw(dataGoogle, this.dash.loadOptionsSatisfacao());
  }

  PrazoChart() {
    var dataGoogle = google.visualization.arrayToDataTable([
      ['Status', 'Quantidade'],
      ['Entregue', this.dataChart.entregues],
      ['Andamento', this.dataChart.andamento],
      ['Não entregues', this.dataChart.naoEntregues]
    ])
    var chart = new google.visualization.PieChart(document.getElementById('chartPrazo'));
    chart.draw(dataGoogle, this.dash.loadOptionsPrazo());
  }

  loadDataDash(){
    this.dash.loadAllDashData().subscribe(res => this.dataAll = res.body);
  }
}
