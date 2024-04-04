import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { AppServiceService } from '../service/app-service.service'
import * as Highcharts from 'highcharts'
import HC_exporting from 'highcharts/modules/exporting'
import HC_export_data from 'highcharts/modules/export-data'
import offlineExporting from 'highcharts/modules/offline-exporting'
import HC_data from 'highcharts/modules/data'
import { ShareDataServiceService } from '../service/share-data-service.service'
import { Meta } from '@angular/platform-browser'
//import { SecondChart } from '../Model/second-chart'

HC_exporting(Highcharts)
offlineExporting(Highcharts)
HC_data(Highcharts)
HC_export_data(Highcharts)

@Component({
  selector: 'app-second-chart',
  templateUrl: './second-chart.component.html',
  styleUrls: ['./second-chart.component.css']
})
export class SecondChartComponent implements OnInit {
  
  goal_per_partner: any = ([] = [])
  partners: any[] = []
  codes: any[] = []
  aua_dates: string[] = []
  exclCash: number[] = []
  inclCash: number[] = []
  logdements: any[] = []

  enhanced_advise: number[] = []
  optimized_advice: number[] = []
  partner_directed_advice: number[] = []
  standardized_advice: number[] = []
  tier: any[] = []
  selectedClients: any[] = []
  

  data = this.partners
  transitionData: any
  chart: typeof Highcharts = Highcharts
  //chartOptions: any[] = []
  chartOption!: Highcharts.Options
  pie_chart_option!: Highcharts.Options
  isHighcharts = typeof Highcharts === 'object';

  part_length!: number
  st_length!: number
  enh_length!: number
  opt_length!: number

  valueToGoal!: number
  partnersData: any
  goalData: any
  selectedPartner!: string
  selectPartnerCode!: number
  goal!: number
  percentage!: number
  len!: number
  lastValue!: number

  check: boolean = false
  hidden = false
  Inc_color_per_partner!: string
  Excl_color_per_partner!: string
  primary_color!: string
  selectedTier!: string
  perc_goal!: any
  isPopupVisible!: boolean
  isPieVisible!: boolean

  prim_color: any
  sec_color: any
  total_percentage!: number
  nodataLoad: string | undefined
  isVisible!: boolean

  constructor (
    private AppServiceService: AppServiceService,
    public _shared_service: ShareDataServiceService,
    private metaService: Meta
    //public intergration: KPIPRACTICEComponent
  ) {
    this.isPopupVisible = false
    this.isPieVisible = false
  }

  ngOnInit (): void {
    this.viewAllTransition()
    this.getPartner(this.selectedPartner)
  }

  togglePopup (): any {
    this.isPopupVisible = !this.isPopupVisible
    this.isPieVisible = !this.isPieVisible
    return this.isPopupVisible
  }

  getLastLodgement () {
    this.part_length = this.partner_directed_advice.length - 1
    this.st_length = this.standardized_advice.length - 1
    this.enh_length = this.enhanced_advise.length - 1
    this.opt_length = this.optimized_advice.length - 1
  }

  DataTranstion (_dates: any) {
    // create the function in the same scope so it does not have to rely on "this"
    // store the value of an anonymous function in a local variable
    var isPopup = () => {
      this.togglePopup()
    }
    var isPiepop = () => {
      this.togglePopup()
    }

    this.chartOption = {
      chart: {
        type: 'column',
        zooming: { type: 'xy' },
        borderRadius: 15,
        //height: 420,
        style: {
          fontFamily: 'Helvetica',
          cursor: 'pointer'
        },
        events: {
          click: e => {
            isPopup()
            this.isPieVisible = false
          }
        },
        plotBorderWidth:1
      },

      lang: {
        noData: 'No data to display'
      },
      noData: {
        style: {
          fontWeight: 'bold',
          fontSize: '15px',
          color: 'red',
          x: 10,
          y: 0,
          textAlign: 'center'
        }
      },

      title: {
        text: 'AUA <br> <br>Transition Progress',
        align: 'left'
      },

      credits: {
        enabled: false
      },

      xAxis: {
        type: 'datetime',
        categories: this.aua_dates.map(date => {
          return Highcharts.dateFormat('%b <br> %y', new Date(date).getTime())
        }),

        labels:{
          style:{
            width: 24,
            height: 34,
            position: 'absolute',
            opacity: 1,
            whiteSpace:'normal',
            fontFamily: 'poppins',
            fontSize: '11px'
          }
        }
      },

      plotOptions: {
        column: {
          selected: true,
          grouping: true,
          groupPadding: 0.3,
          borderRadius: 8,
          borderWidth: 0.05
        },
        series: {
          cursor: 'not-allowed'
        }
      },

      tooltip: {
        shared: true,
        useHTML: true
      },

      legend: {
        verticalAlign: 'top',
        itemStyle: {
          fontSize: '16px'
        },
        align: 'left',
        y: 37,
        x: 230,
        floating: true
      },

      yAxis: {
        title:{
          text: null
        },
        max: 983000000,
        labels: {
          formatter: function () {
            return 'R' + this.axis.defaultLabelFormatter.call(this)
          },

          style:{
            position: 'absolute',
            opacity: 1,
            whiteSpace:'normal',
            fontFamily: 'poppins',
            fontSize: '11px'
          }
        },

        plotLines: [
          {
            id: 'plot-line-1',
            value: this.goal,
            width: 2,
            acrossPanes: true,
            zIndex: 5,
            label: {
              text: `Goal <br><span style="color:${this._shared_service.prim_color}; font-size: 20px; hidden">${this.percentage}%</span`,
              align: 'right'
            },
            color: `${this._shared_service.prim_color}`,
            dashStyle: 'Solid'
          }
        ]
      },

      series: [
        {
          id: '1',
          type: 'column',
          name: 'Excl Cash',
          data: this.exclCash,
          color: this._shared_service.prim_color,
          visible: this.isVisible
        },

        {
          id: '2',
          type: 'column',
          name: 'Incl Cash',
          data: this.inclCash,
          color: this._shared_service.sec_color,
          visible: this.isVisible
        }
      ],
      exporting: {
        enabled: false,
        csv: {
          dateFormat: '',
          itemDelimiter: ';'
        },
        buttons: {
          contextButton: {
            menuItems: ['downloadPDF', 'downloadCSV', 'downloadXLS']
          }
        }
      }
    }

    this.pie_chart_option = {
      chart: {
        type: 'pie',
        style: {
          float: 'right'
        },
        width:500,
        events: {
          click: e => {
            isPiepop()
            this.isPopupVisible = false
          }
        },
        plotBorderWidth:1
      },
      credits: {
        enabled: false
      },

      title: {
        text: 'Lodgements ',
        align: 'left',
        style: {
          whiteSpace: 'pre',
          fontSize: '20px'
        }
      },

      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          point: {
            events: {
              click: e => {
                isPiepop()
                this.isPopupVisible = false
              }
            }
          },
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      legend: {
        title: {
          text: 'Advice Type <br/><span style="font-size: 9px; color: #666; font-weight: normal">&nbsp</span>',
          style: {}
        },
        align: 'left',
        layout: 'vertical',
        labelFormat: '{name} <br> <b>{percentage:.0f}% </b>',
        y: -150,
        itemStyle: {
          fontFamily: 'Helvetica'
        }
      },

      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>'
      },

      series: [
        {
          type: 'pie',
          name: `value`,

          data: [
            {
              name: 'Partner directed advice',
              y: this.partner_directed_advice[this.part_length],
              color: `rgb(102, 34, 255)`
            },

            {
              name: 'Standardised',
              y: this.standardized_advice[this.st_length],
              color: `rgb(219, 93, 236)`
            },

            {
              name: 'Enhanced',
              y: this.enhanced_advise[this.enh_length],
              color: `rgb(60, 10, 144)`
            },

            {
              name: 'Optimized',
              y: this.optimized_advice[this.opt_length],
              color: `hsl(245, 100%, 18%)`
            }
          ]
        }
      ],
      exporting: {
        csv: {
          itemDelimiter: ';'
        },
        buttons: {
          contextButton: {
            menuItems: ['downloadJPEG', 'downloadCSV', 'downloadXLS']
          }
        }
      }
    }
    //console.log(this._shared_service.prim_color)
    
  }

  onValueChanged (e: any) {
    this.selectedPartner = e.value
    this.getPartner(this.selectedPartner)
    this.check =
      this.selectedPartner != null
        ? (this.hidden = true)
        : (this.hidden = false)

    if (this.check == false) {
      this.viewAllTransition()

      this.percentage = 0
      this.goal = 0
    }
    
    //emptying the arrays everytime the value changes
    this.exclCash = []
    this.inclCash = []
    this.aua_dates = []
    this.partners = []
    this.partnersData = []
    this.codes = []
    this.tier = []

    this.enhanced_advise = []
    this.optimized_advice = []
    this.partner_directed_advice = []
    this.standardized_advice = []
   
    this.total_percentage = 0
  }

  getPartner (selectPartner: string) {
    this.AppServiceService.getPartner().subscribe(response => {
      this.partnersData = response
      if (this.partnersData != undefined) {
        for (let index = 0; index < this.partnersData.length; index++) {
          this.tier[index] = this.partnersData[index].tier
          this.partners.push(this.partnersData[index].partnerName)
          this.codes.push(this.partnersData[index].auaTranspartnerCheck)

          // Returning code per selected client
          if (this.partnersData[index].partnerName == selectPartner) {
            this.selectPartnerCode = this.partnersData[index].auaTranspartnerCheck
            this.selectedTier = this.partnersData[index].tier
            
          }
        }
        //Call 'viewTransitionPerPartner' only when partner selected
        if (selectPartner != undefined ) {
          this.sendData() 
          this.viewTransitionPerPartner(this.selectPartnerCode)
          this.Lodgements(this.selectPartnerCode)
          this._shared_service.colorPerPartner(this.selectedTier)
         
        
        }
      }
    })

  }
  
  // SecondChartComponent : Sending Data to the Shared Service
  sendData () {
    let code = this.selectPartnerCode
    this._shared_service.setData(code)
  }

  viewTransitionPerPartner (selected: number) {
    let dateExtract = ''

    if (this.selectedPartner != '') {
      this.AppServiceService.getPerPartner(selected).subscribe(resp => {
        this.transitionData = this.ValidateData(resp)

        if (this.transitionData != null) {
          for (let index = 0; index < this.transitionData.length; index++) {
            //Formatting the date
            dateExtract = this.transitionData[index].date
            // assigning values to each array i.e aua_dates, exclCash, exclCash
            this.aua_dates[index] = dateExtract
            this.exclCash[index] = Math.round(
              this.transitionData[index].exclCash
            )
            this.inclCash[index] = Math.round(
              this.transitionData[index].inclCash
            )
          }
        }

        if (this.exclCash.length == 0 && this.inclCash.length == 0) {
          this.isVisible = false
        } else {
          this.isVisible = true
        }

        this.DataTranstion(this.aua_dates)
        this.getGoalPerPartner(selected)
        this.len = this.inclCash.length - 1
        this.lastValue = this.inclCash[this.len]
        
      })
    }
    
  }

  viewAllTransition () {
    let dateExtract = ''

    if (this.selectedPartner == undefined) {
      this.AppServiceService.getTransition().subscribe(resp => {
        this.transitionData = this.ValidateData(resp)

        if (this.transitionData != null) {
          for (let index = 0; index < this.transitionData.length; index++) {
            //Formatting the date
            dateExtract = ''
            dateExtract = this.transitionData[index].date

            // assigning values to each array i.e aua_dates, exclCash, exclCash
            this.aua_dates[index] = dateExtract // if to control if the date is reapeting
            this.exclCash[index] = Math.round(
              this.transitionData[index].exclCash
            )
            this.inclCash[index] = Math.round(
              this.transitionData[index].inclCash
            )
          }
        }
        this.DataTranstion(this.aua_dates) // method callback
      })
    }
  }

  getGoalPerPartner (code: number) {
    this.AppServiceService.getGoalPerPartner(code).subscribe(response => {
      this.goalData = response

      if (this.goalData != '') {
        for (let index = 0; index < this.goalData.length; index++) {
          this.goal = this.goalData[index].goal1
          this.percentage = this.goalData[index].percentage
        }
      }
      this.DataTranstion(this.aua_dates)
      this.calculateGoal(this.goal, this.percentage)

      if (
        this.exclCash.length == 0 &&
        this.inclCash.length == 0 &&
        this.aua_dates.length == 0
      ) {
        this.nodataLoad = this.chartOption.lang?.noData
      }     
    })

    
  }

  //calculate goal per partner
  calculateGoal (goal: number, percentage: number): any {
    this.valueToGoal = Math.round((this.lastValue / goal) * percentage)
  }

  lodgementGoal (_tier: any): number {
    let total =
      this.partner_directed_advice[this.part_length] +
      this.standardized_advice[this.st_length] +
      this.enhanced_advise[this.enh_length] +
      this.optimized_advice[this.opt_length]

    let partner_perc = Math.round(
      (this.partner_directed_advice[this.part_length] / total) * 100
    )
    let stan_perc = Math.round(
      (this.standardized_advice[this.st_length] / total) * 100
    )
    let enhance_perc = Math.round(
      (this.enhanced_advise[this.enh_length] / total) * 100
    )
    let optimized_perc = Math.round(
      (this.optimized_advice[this.opt_length] / total) * 100
    )

    let tier_one_two_perc = partner_perc + stan_perc
    let tier_three_four_perc = enhance_perc + optimized_perc

    if (_tier === 'Tier 1' || _tier === 'Tier 2') {
      if (tier_one_two_perc > tier_three_four_perc) {
        this.total_percentage = tier_one_two_perc
      } else {
        this.total_percentage = tier_three_four_perc
      }
    } else {
      if (tier_three_four_perc > tier_one_two_perc) {
        this.total_percentage = tier_three_four_perc
      }
    }

    return this.total_percentage
  }

  Lodgements (code: number) {
    this.AppServiceService.getLodgements(code).subscribe(response => {
      //using the filter method to get the distinct values
      if (response != null) {
        this.selectedClients = response
          .map((item: { clientName: any }) => item.clientName)
          .filter(
            (value: any, index: any, self: string) =>
              self.indexOf(value) === index
          )
      }

      this.logdements = this.ValidateLodgement(response)
      if (this.logdements != null) {
        for (let index = 0; index < this.logdements.length; index++) {
          
          this.enhanced_advise[index] = this.logdements[index].enhancedCount
          this.optimized_advice[index] = this.logdements[index].optimizedCount
          this.partner_directed_advice[index] =
            this.logdements[index].partnerDirectedAdviceCount
          this.standardized_advice[index] =
            this.logdements[index].standardizedCount
        }
        this.getLastLodgement()
        this.lodgementGoal(this.selectedTier)
      }

    })
    
  }

  ValidateData (resp: any): any {
    //Iterate through the response object and returning and array of elements (lookup),
    //Add elements of a similar date using array.reduce method.
    //When dates are the same add the excl cash and incl cash values together,
    //And return the filtered object.
    let validatedData = Object.values(
      resp.reduce((obj: any, item: any) => {
        let key = item.date
        if (!obj[key]) {
          obj[key] = Object.assign(item)
        } else {
          obj[key].exclCash += item.exclCash
          obj[key].inclCash += item.inclCash
        }
        return obj
      }, {})
    )
    return validatedData
  }

  ValidateLodgement (resp: any): any {
    let validatedData = Object.values(
      resp.reduce((obj: any, item: any) => {
        let key = item.dateMonth
        if (!obj[key]) {
          obj[key] = Object.assign(item)
        } else {
          obj[key].partnerDirectedAdviceCount += item.partnerDirectedAdviceCount
          obj[key].enhancedCount += item.enhancedCount
          obj[key].optimizedCount += item.optimizedCount
          obj[key].standardizedCount + item.standardizedCount
        }

        return obj
      }, {})
    )
    return validatedData
  }
}
