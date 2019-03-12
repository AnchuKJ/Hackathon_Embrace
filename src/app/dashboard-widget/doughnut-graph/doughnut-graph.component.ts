import { Component, OnInit, Inject } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'cdk-doughnut-graph',
  templateUrl: './doughnut-graph.component.html',
  styleUrls: ['./doughnut-graph.component.scss']
})
export class DoughnutGraphComponent implements OnInit {

  constructor(@Inject('CommonService') private service) { }

  ngOnInit() {
    setTimeout(() => {
        this.createDoughnutGraph();
    },500);
  }
   
    createDoughnutGraph() {
        this.service.GetPostData("http://localhost/BridgeService/webservice1.asmx/GetCampaignPercentage").then((result)=>{
            var data1 = JSON.parse(result.d);
        new Chart('doughnut-graph-graph', {
            type: 'doughnut',
            data: {
            labels: ['Goal ', 'Raised Fund '],
            datasets: [ {
                data: [
                    /*this.randomNumber(),
                    this.randomNumber(),
                    this.randomNumber(),
                    this.randomNumber(),*/
                    data1[0].maxCredit,
                    data1[0].availCredit
                ],
                backgroundColor: [
                    'rgba(255, 99, 132,.7)',
                    'rgba(92, 107, 192,.7)'
                ],
            }]},
            options: {
                elements : {
                    line: {
                        tension: 0.000001
                    }
                },
                legend: {
                    display: true
                },
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    filler: {
                        propagate: false
                    }
                },
                title: {
                    display: true,
                    text: 'CAMPAIGN GRAPH'
                }
            }
        
    });
});
  }

}
