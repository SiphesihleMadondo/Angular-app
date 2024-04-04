import { Component, OnInit } from '@angular/core'
import * as Highcharts from 'highcharts'
import { AppServiceService } from '../service/app-service.service'
import { map } from 'rxjs'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-chart-component',
  templateUrl: './chart-component.component.html',
  styleUrls: ['./chart-component.component.css']
})
export class ChartComponentComponent implements OnInit {
  mediumDate = new DatePipe('en-gb')
  constructor (private AppServiceService: AppServiceService) {}

  chartdata: any;
  auas: any = [];
  dates: any = [];
  chart: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  ngOnInit (): void {
    this.viewData();
  }

  chartData (_aua: any, _dates: any) {
    _dates.sort();

    this.chartOptions = {
      chart: {
        type: 'column',
    
      },

      title: {
        text: 'Monthly Data',
        align: 'center'
      },

      xAxis: {
        type: 'datetime',
        categories: _dates.reverse(),
        dateTimeLabelFormats: {
          day: '%d-%b-%y'
        }
      },

      yAxis: {
        title: {
          text: 'AUA'
        }
      },

      series: [
        {
          name: 'Date',
          type: 'column',
          dataSorting: {
            enabled: true,
            matchByName: true
          },
          data: _aua
        }
      ],
      credits: {
        enabled: false
      },

      tooltip: {
        backgroundColor: '#FCFFC5',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 3
      }
    }
  }

  viewData () {
    this.AppServiceService.getLodgements(5254).subscribe(response => {
      this.chartdata = response
      if (this.chartdata != null) {
        for (let index = 0; index < this.chartdata.length; index++) {
          this.auas.push(this.chartdata[index].aua);
          this.dates.push(
            this.chartdata[index].date.toString().substring(0, 10)
          );
        }
        console.log(this.dates);
        this.chartData(this.auas, this.dates);
      }
    })
  }
}
