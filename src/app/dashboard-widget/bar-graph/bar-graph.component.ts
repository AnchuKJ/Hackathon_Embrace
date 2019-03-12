import { Component, OnInit, Inject } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'cdk-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit {

  constructor(@Inject('CommonService') private service) { }

  ngOnInit() {
      setTimeout(() => {
          this.createBarGraph();
      },2000)
  }

  createBarGraph() {
    this.service.GetPostData("http://localhost/BridgeService/webservice1.asmx/GetCampaignBarGraph").then((result)=>{
        var data1 = JSON.parse(result.d);
   if(data1.length>5)
   {
      new Chart('dash-bar-graph', {
            type: 'bar',
            data: {
                labels: [data1[0].Name, data1[1].Name, data1[2].Name, data1[3].Name, data1[4].Name, data1[5].Name],
                datasets: [
                    {
                        backgroundColor: 'rgba(92, 107, 192, .7)',
                        borderColor: 'rgba(92, 107, 192, .7)',
                        data: [data1[0].MaximumCredit, data1[1].MaximumCredit, data1[2].MaximumCredit, data1[3].MaximumCredit, data1[4].MaximumCredit, data1[5].MaximumCredit],
                        label: 'Goal',
                        fill: 'false'
                    },
                    {
                        backgroundColor: 'rgba(38, 166, 154, .7)',
                        borderColor: 'rgba(69, 39, 160, .7)',
                        data: [data1[0].AvailableCredit, data1[1].AvailableCredit, data1[2].AvailableCredit, data1[3].AvailableCredit, data1[4].AvailableCredit, data1[5].AvailableCredit],
                        label: 'Raised fund',
                        fill: 'false'
                    }
                ]
            },
            options: {
                legend: {
                    display: true
                },
                elements : {
                    line: {
                        tension: 0.000001
                    }
                },
                maintainAspectRatio: false,
                plugins: {
                    filler: {
                        propagate: false
                    }
                },
                title: {
                    display: true,
                    text: 'CAMPAIGNS'
                }
            }
        });
    }
    });

  }
}
