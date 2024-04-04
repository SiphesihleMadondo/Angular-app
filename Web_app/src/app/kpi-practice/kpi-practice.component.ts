import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import * as Highcharts from 'highcharts'
import { AppServiceService } from '../service/app-service.service'
//import { Integration } from '../Model/IntegrationStats'
import { ShareDataServiceService } from '../service/share-data-service.service'
import { Subject, takeUntil } from 'rxjs'
import more from 'highcharts/highcharts-more'
import { CommonModule } from '@angular/common'
import { HighchartsChartModule } from 'highcharts-angular'
import { Meta } from '@angular/platform-browser';
more(Highcharts)

@Component({
  selector: 'app-kpi-practice',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './kpi-practice.component.html',
  styleUrls: ['./kpi-practice.component.css']
})
export class KPIPRACTICEComponent {

  kpi_chart: typeof Highcharts = Highcharts
  kpi_chartOptions!: Highcharts.Options
  kpi_chartConstructor = 'chart'
  isHighcharts = typeof Highcharts === 'object'

  compliance_chart: typeof Highcharts = Highcharts
  compliance_options!: Highcharts.Options
  compliance_constructor = 'chart'
  isCompHighchart = typeof Highcharts === 'object'

  intergration_stats: any
  intergration_dates: any[] = []
  dataIntergration: any[] = []
  IWP: any[] = []
  PGP: any[] = []

  displayOverall: any
  displayNewBusiness: any
  displayReviews: any

  compliance: any
  overall: any[] = []
  new_business: any[] = []
  reviews: any[] = []

  pgp_check: any[] = []
  check_response: any
  receavedCode!: number
  updateFlag = false
  private unsubscribe = new Subject<void>()

  constructor (
    private appService: AppServiceService,
    public _shared_service: ShareDataServiceService,
    private metaService: Meta
    //public model: Integration
  ) {}

 
  ngOnInit (): void {
    this.DataFromService()
    //this.New_business = this.new_business

  }

  IntergrationsChart (_selected_code: any) {
    this.kpi_chartOptions = {
      chart: {
        type: 'spline',
        style: {
          fontFamily: 'Helvetica',
          cursor: 'auto'
        },
        width:500,
        reflow: true,
        plotBorderWidth:1
      },

      title: {
        text: '',
        align: 'left',
        style: {
          fontSize: '15px',
          fontWeight: 'lighter'
        }
      },
      credits: {
        enabled: false
      },

      xAxis: {
        type: 'datetime',
        categories: this.intergration_dates.map(date => {
          return (
            new Date(date).toDateString().substring(4, 7) +
            ' ' +
            new Date(date).toDateString().substring(13)
          )
        }),
        crosshair: {
          color: 'green',
          width: 1
        },
        labels: {
          style: {
            //width: 10,
            //height: 30,
            position: 'absolute',
            opacity: 1,
            whiteSpace: 'normal',
            fontFamily: 'poppins',
            fontSize: '11px'
          }
        }
      },

      yAxis: {
        title: {
          text: null
        },
        labels: {
          style: {
            width: 24,
            height: 34,
            position: 'absolute',
            opacity: 1,
            whiteSpace: 'normal',
            fontFamily: 'poppins',
            fontSize: '11px'
          }
        }
      },

      tooltip: {
        shared: true,
        followPointer: true,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'white',
        formatter: function (value: any): any {
          return this.points?.reduce(function (s, point) {
            // call back function to be executed when the funtion method is called.
            //console.log(s)  passed two arguments s, and point. point used to access elements of the series obj. s to return the designed html
            return (
              s +
              '<br/><div style="font-size: 10px; font-weight: bold; color:' +
              point.color +
              '"' +
              '>' +
              point.series.name +
              '</div> :' +
              point.y
            )
          }, '<div style= "font-size: 10px"> <b>' + this.x + '</div> </b>')
        }
      },

      plotOptions: {
        spline: {
          selected: true,
          borderWidth: 0.05
        }
      },

      legend: {
        enabled: false
      },

      exporting: {
        enabled: false
      },

      series: [
        {
          id: 'first',
          type: 'spline',
          name: 'Data Integration',
          data: this.dataIntergration,
          marker: {
            symbol: 'circle',
            radius: 5,
            fillOpacity: 8
          },
          showInLegend: true,
          color: this._shared_service.prim_color
        },

        {
          id: 'second',
          type: 'spline',
          name: 'IWP',

          data: this.IWP,
          marker: {
            symbol: 'circle',
            radius: 5,
            fillOpacity: 8
          },
          showInLegend: true,
          color: this._shared_service.sec_color
        },

        {
          id: 'third',
          type: 'spline',
          name: 'PGP',

          data: this.PGP,
          marker: {
            symbol: 'circle',
            radius: 5,
            fillOpacity: 8,
            lineColor: 'white',
            enabled: true,
            lineWidth: 0
          },
          showInLegend: true,
          color: 'hsl(206, 3%, 46%)'
        }
      ]
    }

    this.compliance_options = {
      chart: {
        type: 'column',
        inverted: true,
        polar: true,
        width: 600,
        marginLeft:50,
        plotBorderWidth:1
       
      },
      xAxis: {
        tickInterval: 0,
        lineWidth: 0,
        labels: {
          allowOverlap: true
        },
        categories: ['']
      },
      yAxis: {
        max: 100,
        showLastLabel: true,

        labels: {
          formatter: function () {
            return this.axis.defaultLabelFormatter.call(this) + '%'
          }
        },
        lineWidth: 0
      },
      title: {
        text: ''
      },
      tooltip:{
        enabled: true
      },

      legend: {
        enabled: true,
        align:'center',
        itemMarginTop: 5
   

      },
      pane: {
        startAngle: -100,
        size: '100%',
        innerSize: '60%',
        endAngle: 100
      },
      exporting: {
        enabled: false
      },

      series: [
        {
          id: '1',
          type: 'column',
          name: 'Overall',
          data: this.overall,
          color: this._shared_service.prim_color
        },

        {
          id: '2',
          type: 'column',
          name: 'new business',
          data: this.new_business,
          color: this._shared_service.sec_color
        },

        {
          type: 'column',
          name: 'reviews',
          data: this.reviews,
          color: 'gray'
        }
      ]
    }

    /* console.log('Overall', this.overall)
    console.log('New Business', this.new_business)
    console.log('Reviews', this.reviews) */
 
  }

  viewIntegrationStats (selected_code: number) {
    this.appService.getIntergrationStats(selected_code).subscribe(response => {
      this.intergration_stats = this.ValidateIntegrationStats(response)

      if (this.intergration_stats != null) {
        for (let index = 0; index < this.intergration_stats.length; index++) {
          this.intergration_dates[index] =
            this.intergration_stats[index].datedatemonth
          this.dataIntergration[index] =
            this.intergration_stats[index].xPlanImportsUsage
          this.IWP[index] = this.intergration_stats[index].wiUsage7
          this.PGP[index] = this.intergration_stats[index].pgpUsage
        }
        this.IntergrationsChart(this.receavedCode) // call the chart method inside subscribe to in sync data
        
      }
      //console.log(this.intergration_stats)
      
    })
  }

  viewCompliance (selected_code: number) {
    this.appService.getCompliance(selected_code).subscribe(data => {
      this.compliance = data

      if (this.compliance != null) {
        for (let index = 0; index < this.compliance.length; index++) {

          if (this.compliance[index].totalAuditScoreAsAt > 0) {
            this.overall[index] = Math.round(this.compliance[index].totalAuditScoreAsAt * 100)
          } else {
            this.overall[index] = 0
          }
          
          if (this.compliance[index].mastheadNewBusiness > 0) {
            this.new_business[index] = Math.round(this.compliance[index].mastheadNewBusiness * 100)
          } else {
            this.new_business[index] = 0 
          }
          
          if (this.compliance[index].mastheadReviews > 0 ) {
            this.reviews[index] = Math.round(this.compliance[index].mastheadReviews * 100)
          } else {
            this.reviews[index] = 0
          }
          this.displayOverall = this.overall[0]
          this.displayNewBusiness = this.new_business[0]
          this.displayReviews = this.reviews[0]
        }
      }
    
    })
  }

  ValidateIntegrationStats (resp: any): any {
    //Iterate through the response object and returning and array of elements (lookup),
    //Add elements of a similar date using array.reduce method.
    //When dates are the same add the excl cash and incl cash values together,
    //And return the filtered object.
    let validatedData = Object.values(
      resp.reduce((obj: any, item: any) => {
        let key = item.datedatemonth
        if (!obj[key]) {
          obj[key] = Object.assign(item)
        } else {
          obj[key].wiUsage7 += item.wiUsage7
          obj[key].pgpUsage += item.pgpUsage
          obj[key].xPlanImportsUsage += item.xPlanImportsUsage
        }

        return obj
      }, {})
    )
    return validatedData
  }

  DataFromService () {
    this._shared_service
      .getData()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => {
        this.receavedCode = data

        this.intergration_dates = []
        this.dataIntergration = []
        this.IWP = []
        this.PGP = []
        
    
        this.viewIntegrationStats(this.receavedCode)
        
        this.viewCompliance(this.receavedCode)
        
        this.overall = []
        this.new_business = []
        this.reviews = [] 
        this.displayOverall = 0
        this.displayNewBusiness = 0
        this.displayReviews =  0
        
      })
      
  }
}
