/* ################################
  ****  GLOBAL VARIABLES
################################### */
let datepicker_start_date = "2019-05-20";
let datepicker_end_date = "2019-05-23";

let scale_down_last_8_days_revenue = true;

// console.log("this is the start: " + start_date);
// console.log("this is the end: " + end_date);

// console.log("this is the beginning " );
let advertiser_info = {
  "Facebook Ads":       {"name": "FB",      "long_name": "Facebook/IG",       "color": "blue",          "ltv_color": "blue",                  "ltv_opacity": 0.35},
  "pinterest_int":      {"name": "PINT",    "long_name": "Pinterest",         "color": "red",           "ltv_color": "red",                   "ltv_opacity": 0.35},
  "snapchat_int":       {"name": "SNAP",    "long_name": "Snapchat",          "color": "darkorange",    "ltv_color": "darkorange",            "ltv_opacity": 0.35},
  // "liftoff_int":        {"name": "LIFT",    "long_name": "Liftoff",        "color": "cyan",       "ltv_color": "cyan",                  "ltv_opacity": 0.35},
  "googleadwords_int":  {"name": "GOOG",    "long_name": "Google UAC",        "color": "saddlebrown",   "ltv_color": "saddlebrown",           "ltv_opacity": 0.35},  
  "Apple Search Ads":   {"name": "ASA",     "long_name": "Apple Search Ads",  "color": "grey",          "ltv_color": "grey",                  "ltv_opacity": 0.35},
  "Aggregate Paid":     {"name": "AGG",     "long_name": "PAID AGGREGATE",    "color": "black",         "ltv_color": "rgba(255, 0, 0, 0.6)",  "ltv_opacity": 1.0},
  "Organic":            {"name": "Organic", "long_name": "Organic",           "color": "green",         "ltv_color": "rgba(255, 0, 0, 0.6)",  "ltv_opacity": 1.0}
};

let all_possible_advertisers = Object.keys(advertiser_info).filter(d => d != "Aggregate Paid");

// console.log("all possible advertisers: ", all_possible_advertisers);

// this is the total number of advertisers we have in the list above used to decide when we create the total summary row
let num_paid_advertisers = Object.keys(advertiser_info).length - 2;

let aggregate_advertiser_info = {
  "Aggregate Paid":  {"name": "AGG",     "color": "black"},
  "Organic":         {"name": "Organic", "color": "green"}
};

// "dash" -- 
//      Sets the dash style of lines. Set to a dash 
//      type string ("solid", "dot", "dash", "longdash", "dashdot", or "longdashdot") 
//      or a dash length list in px (eg "5px,10px,2px,2px").
let metrics_info = {
  "spend":                            {"name":"Spend",            "symbol": "$",   "highlight_revenue_cutoff_date": false,   "stack_group": "default",   "yaxis": "y1", "dash": "solid",       "numerator": "none",                             "divisor": "none"},
  "installs":                         {"name":"Installs",         "symbol": "",    "highlight_revenue_cutoff_date": false,   "stack_group": "default",   "yaxis": "y1", "dash": "longdash",    "numerator": "none",                             "divisor": "none"},
  "cpi":                              {"name":"CPI",              "symbol": "$",   "highlight_revenue_cutoff_date": false,   "stack_group": "none",      "yaxis": "y2", "dash": "dashdot",     "numerator": "spend",                            "divisor": "installs"},
  "arpu":                             {"name":"ARPU",             "symbol": "$",   "highlight_revenue_cutoff_date": true,    "stack_group": "none",      "yaxis": "y2", "dash": "dot",         "numerator": "ltv_subs_revenue",                 "divisor": "installs"},
  "trial_starts_all":                 {"name":"Trial Starts",     "symbol": "",    "highlight_revenue_cutoff_date": false,   "stack_group": "default",   "yaxis": "y1", "dash": "longdash",    "numerator": "none",                             "divisor": "none"},
  "cpt":                              {"name":"CPT",              "symbol": "$",   "highlight_revenue_cutoff_date": false,   "stack_group": "none",      "yaxis": "y2", "dash": "dashdot",     "numerator": "spend",                            "divisor": "trial_starts_all"},
  "arp_trial":                        {"name":"ARP Trial",        "symbol": "$",   "highlight_revenue_cutoff_date": true,    "stack_group": "none",      "yaxis": "y2", "dash": "dot",         "numerator": "ltv_subs_revenue",                 "divisor": "trial_starts_all"},
  "trials_per_user":                  {"name":"Trials/Inst",      "symbol": "%",   "highlight_revenue_cutoff_date": false,   "stack_group": "none",      "yaxis": "y2", "dash": "dot",         "numerator": "trial_starts_all",                 "divisor": "installs"},
  "ltv_subs_all":                     {"name":"App Subs",         "symbol": "",    "highlight_revenue_cutoff_date": true,    "stack_group": "PAYERS",    "yaxis": "y1", "dash": "longdash",    "numerator": "none",                             "divisor": "none"},
  "subs_per_trial":                   {"name":"Subs/Trial",       "symbol": "%",   "highlight_revenue_cutoff_date": true,    "stack_group": "none",      "yaxis": "y2", "dash": "dash",        "numerator": "ltv_subs_all",                     "divisor": "trial_starts_all"},
  "ltv_subs_revenue":                 {"name":"App Sub REV",      "symbol": "$",   "highlight_revenue_cutoff_date": true,    "stack_group": "REVENUE",   "yaxis": "y1", "dash": "longdash",    "numerator": "none",                             "divisor": "none"},
  "roas":                             {"name":"ROAS: App Subs",   "symbol": "%",   "highlight_revenue_cutoff_date": true,    "stack_group": "none",      "yaxis": "y4", "dash": "dash",        "numerator": ["ltv_subs_revenue"],               "divisor": "spend"},
  "ltv_premium_membership_all":       {"name":"Web Subs",         "symbol": "",    "highlight_revenue_cutoff_date": true,    "stack_group": "PAYERS",    "yaxis": "y1", "dash": "dashdot",     "numerator": "none",                             "divisor": "none"},
  "ltv_premium_membership_revenue":   {"name":"Web Sub Rev",      "symbol": "$",   "highlight_revenue_cutoff_date": true,    "stack_group": "REVENUE",   "yaxis": "y1", "dash": "dashdot",     "numerator": "none",                             "divisor": "none"},
  "ltv_text_chat_all":                {"name":"Chat 1:1 Subs",    "symbol": "",    "highlight_revenue_cutoff_date": true,    "stack_group": "PAYERS",    "yaxis": "y1", "dash": "dash",        "numerator": "none",                             "divisor": "none"},
  "ltv_text_chat_revenue":            {"name":"Chat 1:1 Rev",     "symbol": "$",   "highlight_revenue_cutoff_date": true,    "stack_group": "REVENUE",   "yaxis": "y1", "dash": "dash",        "numerator": "none",                             "divisor": "none"},  
  "total_roas":                       {"name":"ROAS: TOTAL",      "symbol": "%",   "highlight_revenue_cutoff_date": true,    "stack_group": "none",      "yaxis": "y4", "dash": "dash",        "numerator": ["ltv_subs_revenue",
                                                                                                                                                                                                           "ltv_premium_membership_revenue",
                                                                                                                                                                                                           "ltv_text_chat_revenue"],            "divisor": "spend"},
  "total_roas_gc":                    {"name":"ROAS: TOT+GC",     "symbol": "%",   "highlight_revenue_cutoff_date": true,    "stack_group": "none",      "yaxis": "y4", "dash": "dash",        "numerator": ["ltv_subs_revenue",
                                                                                                                                                                                                           "ltv_premium_membership_revenue",
                                                                                                                                                                                                           "ltv_text_chat_revenue",
                                                                                                                                                                                                           "gc_revenue"],                       "divisor": "spend"},  
  "yaxis_placeholder":                {"name":"y1",               "symbol": "",    "highlight_revenue_cutoff_date": false,   "stack_group": "none",      "yaxis": "y1", "dash": "longdash",    "numerator": "none",                             "divisor": "none"}
};


let comp_chart_info = {
  "spend_vs_revenue":   {"name": "Spend Vs. Revenue",         "xaxis_title": "Spend",           "yaxis_title": "Revenue"},
  "spend_vs_gm":        {"name": "Spend Vs. Gross Margin",    "xaxis_title": "Spend",           "yaxis_title": "Gross Margin"},
  "spend_vs_roi":       {"name": "Spend Vs. ROI",             "xaxis_title": "Spend",           "yaxis_title": "ROI"},
  "gm_vs_roi":          {"name": "Gross Margin Vs. ROI",      "xaxis_title": "Gross Margin",    "yaxis_title": "ROI"}
};


// let blank_row_data2 = [{
//   "advertiser": "",
//   "clicks": "",
//   "impressions": "",
//   "installs": "",
//   "ltv_subs_all": "",
//   "ltv_subs_revenue": "",
//   "new_workout_saved_unique": "",
//   "sessions": "",
//   "spend": "",
//   "trial_starts_all": "",
//   "views": ""
// }];

// let blank_row_data = [{
//   "advertiser": 0,
//   "clicks": 0,
//   "impressions": 0,
//   "installs": 0,
//   "ltv_subs_all": 0,
//   "ltv_subs_revenue": 0,
//   "new_workout_saved_unique": 0,
//   "sessions": 0,
//   "spend": 0,
//   "trial_starts_all": 0,
//   "views": 0
// }];

let os_chosen = [];
let advertisers_chosen = [];
let metrics_chosen = [];

let chartdata = [];
let chartdata_aggregate = [];
let comparison_data = [];

let gc_data = [];
let showGiftCard = false;

let organic_data_for_summary = [];

let displayStackedGraph = false;
let displayAggregateAdvertisers = false;
let displayComparisonChart = false;

let comparisonChartType = "spend_vs_revenue";

let y1AxisMaxValue = 0;
let y2AxisMaxValue = 0;

let showLTVPerTrial = false;
let customLTV = 19;

// console.log("revenue day:", revenueCutoffDate);
// console.log("revenue day type:", typeof(revenueCutoffDate));

let todays_date = moment().format('YYYY-MM-DD');
let revenueCutoffDate = moment().subtract(8, 'days').format('YYYY-MM-DD');
let showRevenueCutoffDate = false;

// let firstcall = true;
let myPlotDiv = document.getElementById('linegraph');

// need to replace all instances of
// advertiser_colors
// advertiser_shortname_lookup
// metrics_axis_lookup[metric]
// metrics_info[metric].dash
// metrics_linetype_lookup
// metric_divisor_lookup

/* #########################################
  ****  CHART GENERATORS AND DATA DISPLAYER
############################################ */
// function buildCharts(data1, data2) {
function buildCharts() {

  (displayComparisonChart === true) ? comparisonChart() : lineChartWithMetricsChoices();
  
}

// *********************************************************************
// abracadabra comparison chart
function comparisonChart() {

  let paid_advertisers_to_use = ["Aggregate Paid"];
  
  if(displayAggregateAdvertisers === false && using_flask_app === false){
    paid_advertisers_to_use = Object.keys(comparison_data).filter( x => x !== "Aggregate Paid");
  }
  // console.log(paid_advertisers_to_use);
  
  let traces = [];

  paid_advertisers_to_use.map( paid_advertiser => {
    let trace = {
      // "actual" means it will return a trace with the real revenue values
      // "LTV" means it will calculate the revenue based off of
      // the number of trial starts and the given LTV value
      x: getComparisonChartXValues(comparison_data[paid_advertiser], "actual"),
      y: getComparisonChartYValues(comparison_data[paid_advertiser], "actual"), 
      // name: paid_advertiser,
      name: advertiser_info[paid_advertiser].name,
      mode: 'markers',
      marker: {
        // color: 'rgba(0, 0, 255, 0.6)',
        color: advertiser_info[paid_advertiser].color,
        size: 10
      }
    };

    traces.push(trace);

    if(showLTVPerTrial){
        let trace_ltv = {
          // "LTV" means it will calculate the revenue based off of 
          // the number of trial starts and the given LTV value
          x: getComparisonChartXValues(comparison_data[paid_advertiser], "LTV"),
          y: getComparisonChartYValues(comparison_data[paid_advertiser], "LTV"),
          name: advertiser_info[paid_advertiser].name + " LTV $" + customLTV,
          text: comparison_data[paid_advertiser].date,
          mode: 'markers',
          marker: {
            color: advertiser_info[paid_advertiser].ltv_color,
            opacity: advertiser_info[paid_advertiser].ltv_opacity,
            size: 10
          }
        };
  
        traces.push(trace_ltv);
    }

    
  });


  // traces.push(trace);

  // add lines to the chart for "break even and 112% ROI"
  if(comparisonChartType == "spend_vs_revenue"){
    
    let max_val_for_each_trace = traces.map(trace => {
      return Math.max(...trace.x);
    });

    let max_x_val = Math.max(...max_val_for_each_trace);

    let trace2 = {
      x: [0, max_x_val],
      y: [0, max_x_val],
      name: "Break Even",
      hoverinfo: 'name',
      mode: 'lines',
      line: {
        color: "orange"
      }
    };
    traces.push(trace2);

    // let trace3 = {
    //   x: [0, max_x_val],
    //   y: [0, max_x_val * 1.12],
    //   name: "112% ROI",
    //   hoverinfo: 'name',
    //   mode: 'lines',
    //   fill: 'tonexty',
    //   fillcolor: 'rgba(255, 165, 0, 0.3)',
    //   line: {
    //     color: "green"
    //   }
    // };
    // traces.push(trace3);

  }

  var comparisonLayout = {
    hovermode:'closest',
    title: comp_chart_info[comparisonChartType].name,
    xaxis: {
      title: comp_chart_info[comparisonChartType].xaxis_title, 
      //domain: [0.06, 0.94]},
      rangemode: "tozero"
    },
    yaxis: {
      title: comp_chart_info[comparisonChartType].yaxis_title,
      rangemode: "tozero"
    },
    height: 600,
    width: 1200
  };  
  
  Plotly.react(myPlotDiv, traces, comparisonLayout);
  // Plotly.newPlot('linegraph', traces, comparisonLayout);

}


// **********************************************************************
// MAIN OVERTIME LINE GRAPH
function lineChartWithMetricsChoices() {

  let tempChartData = [];

  (displayAggregateAdvertisers === true) ? tempChartData = chartdata_aggregate : tempChartData = chartdata;

  // creates a list of the unique advertisers in the "advertiser" object of the dictionary
  let unique_advertisers = tempChartData.advertiser.filter( onlyUnique );

  // console.log("length of advertiser array", unique_advertisers.length);
  // console.log("unique advertisers array", unique_advertisers);

  let traces = [];

  // sampleData.sample_values.max

  for(i=0; i < unique_advertisers.length; i++ ){

    let advertiser = unique_advertisers[i];

    for(j=0; j < metrics_chosen.length; j++){

      let metric = metrics_chosen[j];
      
      let trace = {
        x: getOvertimeGraphXValues(tempChartData, "date", advertiser),
        y: getOvertimeGraphYValues(tempChartData, metric, advertiser),
        name: advertiser_info[advertiser].name + " " + metrics_info[metric].name,
        // name: advertiser_shortname_lookup[advertiser] + " " + metric,
        // text: "testing",
        mode: 'scatter',
        // mode: 'lines+markers',
        // ABARACADABARA
        fill: setFillMode(metric),
        stackgroup: setStackGroup(metric),
        hovertext: setHoverText(tempChartData, metric, advertiser),
        hoverinfo: 'text+name', //will display the hovertext next to the name
        // hoverinfo: 'x+y+name',
        // size: tempChartData.installs.map( (value) => {
        //   if(value < 10){
        //     return 10; 
        //   }
        //   return value/20;
        // }),
        visible: setTraceVisibility(metric),
        yaxis: metrics_info[metric].yaxis,
        // yaxis: metrics_axis_lookup[metric],
        line: {
          dash: metrics_info[metric].dash,
          shape: "spline",
          smoothing: 0.6,
          // dash: metrics_linetype_lookup[metric],
          color: advertiser_info[advertiser].color
          // color: advertiser_colors[advertiser]
        }
      };
  
      traces.push(trace);

    }

  }

  //console.log("metrics chosen", metrics_chosen);//(metrics_chosen.includes("ltv_subs_revenue"))
  // console.log("metrics chosen includes ltv subs?", metrics_chosen.includes("ltv_subs_revenue"));
  // ADD GIFTCARD TRACE IF NECESSARY
  // ****** NOTE *****
  // IN THIS VERSION OF THE ANALYTICS DASHBOARD, WE'VE REMOVED THE GIFTCARD CHECKBOX 
  // AND COMMENTED OUT ITS FUNCTIONALITY IN THE updateAdditionalControls() FUNCTION
  // SO EVEN IF SOMEONE WERE ABLE TO HACK THE HTML AND GET THE GIFTCARD CHECKBOX TO BE VISIBLE
  // THIS CODE WOULD NEVER RUN BECAUSE THE "showGiftCard" VARIABLE WOULD ALWAYS BE FALSE
  if( showGiftCard && ( metrics_chosen.includes("ltv_subs_revenue")|| metrics_chosen.includes("ltv_premium_membership_revenue") || metrics_chosen.includes("ltv_text_chat_revenue") ) ){
    // console.log("Adding Giftcard trace", gc_data["gc_revenue"]);
    // console.log("dates", gc_data["date"]);

    let trace = {
      x: gc_data["date"],
      y: gc_data["gc_revenue"],
      name: "GC Revenue",
      // name: advertiser_shortname_lookup[advertiser] + " " + metric,
      // text: "testing",
      mode: 'scatter',
      // mode: 'lines+markers',
      stackgroup: setStackGroup("ltv_subs_revenue"),
      // hovertext: setHoverText(tempChartData, metric, advertiser),

      hovertext: gc_data["gc_revenue"].map((revenue, i) => {
        let formattedDate = moment(gc_data["date"][i]).format('ddd, MM/DD'); //.format('ddd, MMM D') 
        let yval = "$" + revenue.toFixed(2);
        let hovertext = yval + " (" + formattedDate + ")";

        return hovertext;
      }),
      hoverinfo: 'text+name', //will display the hovertext next to the name

      // hoverinfo: 'x+y+name',
      // size: tempChartData.installs.map( (value) => {
      //   if(value < 10){
      //     return 10; 
      //   }
      //   return value/20;
      // }),
      visible: true,
      yaxis: "y1",
      // yaxis: metrics_axis_lookup[metric],
      line: {
        dash: metrics_info["ltv_subs_revenue"].dash,
        shape: "spline",
        smoothing: 0.6,
        // dash: metrics_linetype_lookup[metric],
        color: "purple"
        // color: advertiser_colors[advertiser] foobar
      }
    };

    traces.push(trace);



  }



  // console.log("traces: ", traces);
  var lineLayout = {
    hovermode:'closest',
    // title: 'Bubble Chart Hover Text',
    // showlegend: false,
    xaxis: {title: "date", domain: [0.06, 0.94], showgrid: false},
    yaxis: {
      title: nameYAxisTitle("y1"), //"yaxis1 title"
      // range: setAxisRangeWhenEmpty([0,1]),
      range: (y1AxisMaxValue === 0) ? setAxisRangeWhenEmpty([0,1]) : [0, y1AxisMaxValue], 
      autorange: (y1AxisMaxValue === 0) ? true : false, // autorange will take precedence over the above
      showticklabels: setAxisLabelsAndGridVisibility(), // true or false depending on if any metrics are chosen
      showgrid: setAxisLabelsAndGridVisibility(),
      rangemode: "tozero"
    },
    // yaxis: {title: "yaxis1 title"},
    yaxis2: {
      title: nameYAxisTitle("y2"), //'yaxis2 title'
      // range: [0, 5],
      //if y2AxisMaxValue is 0, then return [] otherwise return [0, y2AxisMaxValue]
      range: (y2AxisMaxValue === 0) ? [] : [0, y2AxisMaxValue],
      rangemode: "tozero",
      // titlefont: {color: 'rgb(148, 103, 189)'},
      // tickfont: {color: 'rgb(148, 103, 189)'},
      overlaying: 'y',
      // anchor: 'x',
      // autorange: true,
      side: 'right'
    },
    yaxis3: {
      title: nameYAxisTitle("y3"), //'yaxis2 title'
      rangemode: "tozero",
      titlefont: {color: 'rgb(148, 103, 189)'},
      tickfont: {color: 'rgb(148, 103, 189)'},
      gridcolor: 'rgb(148, 103, 189)',
      anchor: 'free',
      overlaying: 'y',
      // autorange: true,
      side: 'left',
      position: 0.0
    },
    yaxis4: {
      title: nameYAxisTitle("y4"), //'yaxis2 title'
      rangemode: "tozero",
      titlefont: {color: 'rgb(148, 103, 189)'},
      tickfont: {color: 'rgb(148, 103, 189)'},
      gridcolor: 'rgba(148, 103, 189, 0.3)',
      // linecolor: 'rgb(148, 103, 189)', // sets the color of the vertical y axis line next to the ticks
      zerolinecolor: 'rgba(148, 103, 189, 0.8)', // #969696
      zerolinewidth: 2,
      anchor: 'free',
      overlaying: 'y',
      // autorange: true,
      side: 'right',
      position: 1.0
    },
    // legend: {orientation:"h"},
    legend: {orientation:"h", x: "0.0", y: "1.2"},
    height: 600,
    width: 1200
  };
  
  Plotly.react(myPlotDiv, traces, lineLayout);
  // Plotly.newPlot('linegraph', traces, lineLayout);

  // Because people usually only pay us if they have converted from trial to subscription
  // We shouldn't care about revenue or subs based metrics for days between today and 7 days ago
  // Due to this, we want to draw a vertical line on the graph to show where that cutoff is
  // But we only want to do it if a metric is on the graph that is based on Revenue or Subscribers
  // so first we filter out the metrics chosen to see if any of them are "subs_metrics"
  let highlight_revenue_cutoff_date_metrics_chosen = metrics_chosen.filter((metric) => {return metrics_info[metric].highlight_revenue_cutoff_date });
  
  // if the data we are displaying contains the date where we want to draw the vertical line
  // AND there is at least one "subs_metrics" that the user has chosen then draw that line!
  if( tempChartData.date.includes(revenueCutoffDate) && ( highlight_revenue_cutoff_date_metrics_chosen.length > 0) ){

    let yAxisMaxVal = lineLayout.yaxis.range[1];

    // console.log("Adding revenue cutoff date trace");
    // console.log('Y-axis range max val: ' + yAxisMaxVal);
    
    let trace = {
      x: [revenueCutoffDate, revenueCutoffDate],
      y: [0, yAxisMaxVal],
      // name: "8 Days Ago",
      name: "8 Days Ago",
      // name: advertiser_shortname_lookup[advertiser] + " " + metric,
      // text: "testing",
      mode: 'lines',
      hovertext: "<b>Trial Conversion Window</b><br>(revenue may be low after)<br>" + moment(revenueCutoffDate).format('ddd, MM/DD'),
      hoverinfo: 'text', //will display the hovertext next to the name
      // hoverinfo: 'x+y+name',
      // size: tempChartData.installs.map( (value) => {
      //   if(value < 10){
      //     return 10; 
      //   }
      //   return value/20;
      // }),
      //visible: true,
      showlegend: false,
      yaxis: "y1",
      line: {
        dash: "dot",
        //shape: "spline",
        //smoothing: 0.6,
        // dash: metrics_linetype_lookup[metric],
        color: "black"
        // color: advertiser_colors[advertiser]
      }
    };

    // console.log("adding revenue cutoff trace");
    Plotly.addTraces(myPlotDiv, trace);

  }

  //check to see if any of the ROAS metrics are checked
  let draw_112_percent_line = false; 
  
  //if any of them are checked then set the boolean to true
  metrics_chosen.map((metric) => {
    if(metric == "roas" || metric == "total_roas" || metric == "total_roas_gc"){
      draw_112_percent_line = true;
    }
  });

  //if a ROAS metric is checked, draw a line at 12% to show what our ROAS target is
  // COMMENTED OUT THIS LINE AND SET THE CONDITION TO ALWAYS BE "false"
  // SO THIS CODE WILL NEVER RUN FOR THIS VERSION
  // if( draw_112_percent_line ){
  if( false ){

    console.log("Adding 112% trace");
    
    let trace = {
      x: [tempChartData.date[0], tempChartData.date[tempChartData.date.length - 1]],
      y: [12, 12],
      name: "ROAS Goal",
      // name: advertiser_shortname_lookup[advertiser] + " " + metric,
      // text: "testing",
      mode: 'lines',
      hovertext: "112%",
      hoverinfo: 'text+name', //will display the hovertext next to the name
      // hoverinfo: 'x+y+name',
      // size: tempChartData.installs.map( (value) => {
      //   if(value < 10){
      //     return 10; 
      //   }
      //   return value/20;
      // }),
      //visible: true,
      showlegend: false,
      yaxis: "y4",
      line: {
        dash: "dot",
        //shape: "spline",
        //smoothing: 0.6,
        // dash: metrics_linetype_lookup[metric],
        color: "gold"
        // color: advertiser_colors[advertiser]
      }
    };

    // console.log("adding revenue cutoff trace");
    Plotly.addTraces(myPlotDiv, trace);

  }

}


// ############ THIS FUNCTION WILL CREATE THE HTML THAT WILL FILL IN THE TABLE  ############
// ############ WITH ALL THE IMPORTANT INFORMATION WE CARE ABOUT FOR ACQUIAITION  ############
const getRowHTML = function(tempData){
  // console.log("inside getTableDataFunction");

  let paidTableHtml = ``;
  
  paidTableHtml = `<!-- <td>${tempData.date}</td> --><!-- Date -->
  <td>
    ${advertiser_info[tempData.advertiser].long_name}<!-- Advertiser Name -->
  </td>
  <td>
    $${numberWithCommas(tempData.spend.toFixed(2))}<!-- Spend -->
  </td>
  <td>
    ${numberWithCommas(tempData.impressions)}<!-- Impressions -->
  </td>
  <td>
    ${( (tempData.clicks / tempData.impressions) * 100 ).toFixed(2)}% <!-- CTR -->
  </td>
  <td>
    ${numberWithCommas(tempData.clicks)}<!-- Clicks -->
  </td>
<!-- 
  <td>
    ${numberWithCommas(tempData.views)}<- Views ->
  </td>
-->
  <td>
  ${( (tempData.installs / tempData.clicks) * 100 ).toFixed(2)}% <!-- Installs per click -->
  </td>
  <td>
    ${numberWithCommas(tempData.installs)}<!-- Installs -->
  </td>
  <td>
    $${(tempData.spend / tempData.installs).toFixed(2)}<!-- CPI -->
  </td>
  <td>
    $${(tempData.ltv_subs_revenue / tempData.installs).toFixed(2)}<!-- ARPU -->
  </td>
<!-- 
  <td>
    ${numberWithCommas(tempData.sessions)}<- Sessions ->
  </td>
-->
  <td>
    ${numberWithCommas(tempData.new_workout_saved_unique)}<!-- Core Actions -->
  </td>
  <td>
    ${( (tempData.trial_starts_all / tempData.installs) * 100 ).toFixed(2)}% <!-- Trials / Install -->
  </td>
  <td>
    ${numberWithCommas(tempData.trial_starts_all)}<!-- Trial Starts -->
  </td>
  <td>
    $${(tempData.spend / tempData.trial_starts_all).toFixed(2)}<!-- CPT -->
  </td>
  <td>
    $${(tempData.ltv_subs_revenue / tempData.trial_starts_all).toFixed(2)}<!-- ARP Trial -->
  </td>
  <td>
    ${( (tempData.ltv_subs_all / tempData.trial_starts_all) * 100 ).toFixed(2)}% <!-- Subs / Trial -->
  </td>
  <td>
    ${numberWithCommas(tempData.ltv_subs_all)}<!-- Subscribers -->
  </td>
  <td>
    $${(tempData.spend / tempData.ltv_subs_all).toFixed(2)}<!-- CPSub -->
  </td>
  <td>
    $${(tempData.ltv_subs_revenue / tempData.ltv_subs_all).toFixed(2)}<!-- ARP Sub -->
  </td>
  <td>
    $${numberWithCommas(tempData.ltv_subs_revenue.toFixed(2))}<!-- Revenue -->
  </td>
  <td>
    ${( ((tempData.ltv_subs_revenue / tempData.spend) - 1) * 100 ).toFixed(2)}% <!-- ROAS -->
  </td>`;
  // <td>
  //   ${numberWithCommas(tempData.ltv_premium_membership_all)}<!-- SUBS: Prem Mems -->
  // </td>
  // <td>
  //   $${numberWithCommas(tempData.ltv_premium_membership_revenue.toFixed(2))}<!-- REV: Prem Mems -->
  // </td>
  // <td>
  //   ${numberWithCommas(tempData.ltv_text_chat_all)}<!-- SUBS: Text Chat  -->
  // </td>
  // <td>
  //   $${numberWithCommas(tempData.ltv_text_chat_revenue.toFixed(2))}<!-- REV: Text Chat -->
  // </td>
  // <td>
  //   ${( (( (tempData.ltv_subs_revenue + tempData.ltv_premium_membership_revenue + tempData.ltv_text_chat_revenue) / tempData.spend) - 1) * 100 ).toFixed(2)}% <!-- TOTAL ROAS -->
  // </td>`;

  return paidTableHtml;
}

const getOrganicPlusPaidSummaryRowHTML = function(tempData){

  let paidTableHtml = ``;
  
  paidTableHtml = `<!-- <td>${tempData.date}</td> --><!-- Date -->
  <td>
    ${tempData.advertiser}<!-- Advertiser Name -->
  </td>
  <td>
    $${numberWithCommas(tempData.spend.toFixed(2))}<!-- Spend -->
  </td>
  <td>
    <!-- ${numberWithCommas(tempData.impressions)}--><!-- Impressions -->
  </td>
  <td>
    <!-- ${( (tempData.clicks / tempData.impressions) * 100 ).toFixed(2)}% --><!-- CTR -->
  </td>
  <td>
    <!-- ${numberWithCommas(tempData.clicks)}--><!-- Clicks -->
  </td>
<!-- 
  <td>
  <- ${numberWithCommas(tempData.views)}-><- Views ->
  </td>
-->
  <td>
  <!-- Installs / Click -->
  </td>
  <td>
    ${numberWithCommas(tempData.installs)}<!-- Installs -->
  </td>
  <td>
    $${(tempData.spend / tempData.installs).toFixed(2)}<!-- CPI -->
  </td>
  <td>
    <!-- ARPU -->
  </td>
<!-- 
  <td>
    <-${numberWithCommas(tempData.sessions)}-><- Sessions ->
  </td>
-->
  <td>
    ${numberWithCommas(tempData.new_workout_saved_unique)}<!-- Core Actions -->
  </td>
  <td>
    ${( (tempData.trial_starts_all / tempData.installs) * 100 ).toFixed(2)}% <!-- Trials / Install -->
  </td>
  <td>
    ${numberWithCommas(tempData.trial_starts_all)}<!-- Trial Starts -->
  </td>
  <td>
    $${(tempData.spend / tempData.trial_starts_all).toFixed(2)}<!-- CPT -->
  </td>
  <td>
    <!-- ARP Trial -->
  </td>
  <td>
    <!-- Subs / Trial -->
  </td>
  <td>
    <!-- Subscribers -->
  </td>
  <td>
    <!-- CPSub -->
  </td>
  <td>
    <!-- ARP Sub -->
    GROSS<br>MARGIN<br>
    $${numberWithCommas((tempData.ltv_subs_revenue - tempData.spend).toFixed(2))}
  </td>
  <td>
  <!-- Revenue -->
  <!-- Subs/Org<br>GM<br>ARPU
    $${( (tempData.ltv_subs_revenue / tempData.installs) - (tempData.spend / tempData.installs) ).toFixed(2)}  GM ARPU 
  -->
    TOTAL<br>REVENUE<br>
    $${numberWithCommas((tempData.ltv_subs_revenue).toFixed(2))}
  </td>
  <td>
    <!-- ROAS -->
    GM<br>ROI<br>
    ${( tempData.ltv_subs_revenue / tempData.spend * 100 ).toFixed(2)}%
  </td>`;
  // <td>
  //   <!-- SUBS: Prem Mems -->
  // </td>
  // <td>
  //   ALL<br>IN-APP<br>REV<br>
  //   $${numberWithCommas((tempData.ltv_subs_revenue + tempData.ltv_text_chat_revenue + tempData.ltv_premium_membership_revenue).toFixed(2))}
  //   <!-- CRS -->
  // </td>
  // <td>
  //   IN-APP<br>GM<br>ROI<br>
  //   ${( (tempData.ltv_subs_revenue + tempData.ltv_text_chat_revenue + tempData.ltv_premium_membership_revenue) / tempData.spend * 100 ).toFixed(2)}%
  //   <!-- GM ROI -->
  // </td>
  // <td>
  //   GC<br>REV<br>
  //   $${numberWithCommas((tempData.gc_revenue).toFixed(2))}
  //   <!-- GM ROI -->
  // </td>
  // <td>
  //   IN-APP + GC<br>GM<br>ROI<br> 
  //   ${( (tempData.ltv_subs_revenue + tempData.ltv_text_chat_revenue + tempData.ltv_premium_membership_revenue + tempData.gc_revenue)/ tempData.spend * 100 ).toFixed(2)}%
  //   <!-- GM ROI -->
  // </td>`;

  return paidTableHtml;
}


const getOrganicRowHTML = function(tempData){

  // console.log("getOrganicRowHTML");

  let paidTableHtml = ``;
  
  paidTableHtml = `
  <td>
    ${tempData.advertiser}<!-- Advertiser Name -->
  </td>
  <td>--</td><!-- Spend -->
  <td>--</td><!-- Impressions -->
  <td>--</td><!-- CTR -->
  <td>--</td><!-- Clicks -->
  <!--<td>--</td>--> <!-- Views -->
  <td>--</td><!-- Inst/Click -->
  <td>
    ${numberWithCommas(tempData.installs)}<!-- Installs -->
  </td>
  <td>--</td><!-- CPI -->
  <td>--</td><!-- ARPU -->
  <!--<td>--</td>--><!-- Sessions -->
  <td>
    ${numberWithCommas(tempData.new_workout_saved_unique)}<!-- Core Actions -->
  </td>
  <td>
  ${( (tempData.trial_starts_all / tempData.installs) * 100 ).toFixed(2)}% <!-- Trials / Install -->
  </td>
  <td>
    ${numberWithCommas(tempData.trial_starts_all)}<!-- Trial Starts -->
  </td>
  <td>--</td><!-- CPT -->
  <td>--</td><!-- ARP Trial -->
  <td>--</td><!-- Subs/Trial-->
  <td>--</td><!-- Subs -->
  <td>--</td><!-- CPSub -->
  <td>--</td><!-- ARP Sub -->
  <td>
  <!-- Revenue -->
  Revenue Misattributed as Organic<br>
    $${numberWithCommas((tempData.ltv_subs_revenue).toFixed(2))}
  </td>
  <td>--</td><!-- ROAS -->`;
  // <td>--</td><!-- SUBS: Prem Mems -->
  // <td>
  //   $${numberWithCommas(tempData.ltv_premium_membership_revenue.toFixed(2))}<!-- REV: Prem Mems-->
  // </td>
  // <td>--</td><!-- SUBS: Text Chat  -->
  // <td>
  //   $${numberWithCommas(tempData.ltv_text_chat_revenue.toFixed(2))}<!-- REV: Text Chat -->
  // </td>
  // <td>--</td><!-- TOTAL ROAS -->`;
  
  return paidTableHtml;
}


const getBlankRowHTML = function(){

  console.log("getting blank row");

  let paidTableHtml = ``;
  
  paidTableHtml = `
  <td>--</td><!-- Advertiser Name -->
  <td>--</td><!-- Spend -->
  <td>--</td><!-- Impressions -->
  <td>--</td><!-- CTR -->
  <td>--</td><!-- Clicks -->
  <!--<td>--</td>--> <!-- Views -->
  <td>--</td><!-- Inst/Click -->
  <td>--</td><!-- Installs -->
  <td>--</td><!-- CPI -->
  <td>--</td><!-- ARPU -->
  <!-- <td>--</td>--> <!-- Sessions -->
  <td>--</td><!-- Core Actions -->
  <td>--</td><!-- Trials/User-->
  <td>--</td><!-- Trial Starts -->
  <td>--</td><!-- CPT -->
  <td>--</td><!-- ARP Trial -->
  <td>--</td><!-- Subs/Trial-->
  <td>--</td><!-- Subs -->
  <td>--</td><!-- CPSub -->
  <td>--</td><!-- ARP Sub -->
  <td>--</td><!-- Revenue -->
  <td>--</td><!-- ROAS -->`;
  // <td>--</td><!-- SUBS: Prem Mems -->
  // <td>--</td><!-- REV: Prem Mems-->
  // <td>--</td><!-- SUBS: Text Chat  -->
  // <td>--</td><!-- REV: Text Chat -->
  // <td>--</td><!-- TOTAL ROAS -->

  return paidTableHtml;
}


function addAllAdvertiserDataInColumn(data, columnName){

    let addedData = 0;

    data.map((d, i) => {
          addedData += d[columnName];
    });

    return addedData;
}

function addAllDataInList(data){

  let addedData = 0;

  data.map((d, i) => {
        addedData += d;
  });

  return addedData;
}

function createSummaryRow(data, row_name, tr_class, callRowHTML){
  
  // console.log("creating summary row");

  // note that the order of each entry in the dictionary is unimportant
  let summary_row_data = [{
    "advertiser": row_name,
    "clicks": addAllAdvertiserDataInColumn(data, "clicks"),
    "impressions": addAllAdvertiserDataInColumn(data, "impressions"),
    "installs": addAllAdvertiserDataInColumn(data, "installs"),
    "ltv_subs_all": addAllAdvertiserDataInColumn(data, "ltv_subs_all"),
    "ltv_subs_revenue": addAllAdvertiserDataInColumn(data, "ltv_subs_revenue"),
    // "ltv_premium_membership_all": addAllAdvertiserDataInColumn(data, "ltv_premium_membership_all"),
    // "ltv_premium_membership_revenue": addAllAdvertiserDataInColumn(data, "ltv_premium_membership_revenue"),
    // "ltv_text_chat_all": addAllAdvertiserDataInColumn(data, "ltv_text_chat_all"),
    "new_workout_saved_unique": addAllAdvertiserDataInColumn(data, "new_workout_saved_unique"),
    "sessions": addAllAdvertiserDataInColumn(data, "sessions"),
    "spend": addAllAdvertiserDataInColumn(data, "spend"),
    "trial_starts_all": addAllAdvertiserDataInColumn(data, "trial_starts_all"),
    "views": addAllAdvertiserDataInColumn(data, "views"),
    // "ltv_text_chat_revenue": addAllAdvertiserDataInColumn(data, "ltv_text_chat_revenue"),
    // "gc_revenue": addAllDataInList(gc_data.gc_revenue),
    // "organic_revenue": addAllAdvertiserDataInColumn(organic_data_for_summary, "ltv_subs_revenue")
    // "organic_revenue": addAllDataInList(organic_data_for_summary.ltv_subs_revenue)
  }];

  // add the summary row
  let tr_summary = d3.select('tbody').selectAll(tr_class).data(summary_row_data);

  tr_summary.enter()
      .append("tr").classed("highlight", true)//.classed(".table-dark", true)
      .merge(tr_summary)
      .html(callRowHTML);
  
  tr_summary.exit().remove();

  return 1;
}

// add the rows for each data entry and select all tr_class objects
function createRowsFromData(data, tr_class, callRowHTML){

    let tr = d3.select('tbody').selectAll(tr_class).data(data);    

    tr.enter()
        .append("tr")//.classed("highlight", false)
        .merge(tr)
        .html(callRowHTML);

    tr.exit().remove();
}


function displayTableData(data){

    // console.log("attempting to display table data");
    // console.log("tabledata = ", data);

    

    advertiser_data = data.filter((d) => {
      return d.advertiser !== "Organic";
    });

    organic_data = data.filter((d) => {
      return d.advertiser === "Organic";
    });

    // console.log("displayTableData() organic Data = ", organic_data);

    // remove all additional row formatting before building the table
    d3.select('tbody').selectAll('tr').classed("highlight", false);

    // create rows from advertiser_data
    createRowsFromData(advertiser_data, "tr", getRowHTML);

    // if there's more than one advertiser add the paid summary row
    if( advertiser_data.length > 1) {
      createSummaryRow(advertiser_data, "Aggregate Paid", "tr.summary", getRowHTML);
    }

    // add organics row
    if( organic_data.length > 0) {

      createRowsFromData(organic_data, "tr.organic", getOrganicRowHTML);
      
    }

    // add total summary row if there is at least one advertiser selected AND Organic is chosen
    if( advertiser_data.length > 0 && organic_data.length > 0) {
      createSummaryRow(data, "TOTAL SUMMARY", "tr.summarywithorganics", getOrganicPlusPaidSummaryRowHTML);
    }   

}






/* ################################################################################################
  *******************  EVENT HANDLERS WITH API CALLS *******************
################################################################################################### */

// DATE PICKER "DATE CHANGED"
function dateChanged(start, end) {

  let start_date = start.format('YYYY-MM-DD');
  let end_date = end.format('YYYY-MM-DD');

  datepicker_start_date = start_date;
  datepicker_end_date = end_date;

  console.log("A new date selection was made: " + start_date + ' to ' + end_date );
  // Fetch new data each time a new sample is selected

  let api_call = "/api/v1.0/daterange_pandas/" + start_date + "/" + end_date; 

  makeAPICall(api_call);

}


function updateOSSelection(){
  
  os_chosen = get_checkbox_choices(".OSCheckbox");

  if(os_chosen.includes("BOTH")){
    os_chosen = ["IOS", "ANDROID"];
  }

  // since Google and ASA only have metrics present for IOS, we want to do something
  // to highlight this when only the ANDROID radio button is checked
  // this code will set the text for those checkboxes to be italic and line through
  // when only the ANDROID button is set and normal if IOS or BOTH are set
  let disable_google_asa_checkbox_text = (os_chosen.length === 1 && os_chosen.includes("ANDROID")) ? true : false;

  d3.selectAll(".ios_only_text").each( function(d) {
    let element = d3.select(this); // gets a reference to the element

    if(disable_google_asa_checkbox_text) {      
      element.style('font-style', 'italic');
      element.style('text-decoration', 'line-through');
    }
    else{
      element.style('font-style', 'initial');
      element.style('text-decoration', 'initial');
    }
  });

  // IF WE WANT TO ACTUALLY DISABLE THE CHECKBOXES WE CAN WITH THIS CODE...BUT THAT CAUSES COMPLICATIONS
  // let google_checkbox = d3.selectAll(".AdvertiserCheckbox[value='googleadwords_int']");
  // let asa_checkbox = d3.selectAll(".AdvertiserCheckbox[value='Apple Search Ads']");
  // google_checkbox.property('disabled', disable_google_asa_checkbox_text);
  // asa_checkbox.property('disabled', disable_google_asa_checkbox_text);

  let api_call_base = "/api/v1.0/os_type";
  let item_key = "os";

  let api_call = createAPICallString(api_call_base, item_key, os_chosen);

  makeAPICall(api_call);

}

//abracadabra
function updateAdvertiserSelection(){

  advertisers_chosen = get_checkbox_choices(".AdvertiserCheckbox");

  if(advertisers_chosen.length === 0){
    advertisers_chosen = all_possible_advertisers;
  }

  if( advertisers_chosen.length === 1 && advertisers_chosen.includes("Organic") ){
    highlight_text_with_class(".select_advertisers_header_text", true);
  }
  else{
    highlight_text_with_class(".select_advertisers_header_text", false);
  }


  
  let api_call_base = "/api/v1.0/advertiser_type";
  let item_key = "advertiser";

  let api_call = createAPICallString(api_call_base, item_key, advertisers_chosen);

  makeAPICall(api_call);

}

/* ####################################
  *********  API CALL ***************
####################################### */
function makeAPICall(api_call){

  // If we are actually making an API call to a server use this method
  if(using_flask_app){

    console.log(api_call);

    d3.json( api_call ).then((data) => {
      // 0 == chart_formated_data
      // 1 == chart_formated_data_aggregate
      // 2 == daterange_pandas_tabledata()
      // can be generated from #1 -- 3 == daterange_pandas_comparison_chart()
      // 4 == giftcard_revenue()    

      chartdata = data[0];
      chartdata_aggregate = data[1]; // includes separate group for Organics
      let table_data = data[2]; // data formated for the table view
      comparison_data = {"Aggregate Paid": data[3]}; // removes separate group for Organics from "chartdata_aggregate"
      gc_data = data[4];

      buildCharts();
      displayTableData(table_data);
  
    });
  }
  // If we are just using a static JSON data file to store information use this method
  else{
    // 0 == chart_formated_data
    // 1 == chart_formated_data_aggregate
    // 2 == daterange_pandas_tabledata()
    // 3 can be generated from #1 == daterange_pandas_comparison_chart()
    // 4 == giftcard_revenue()    

    chartdata = generateChartData(); // grabs the data from specified daterange, OS, and Advertisers
    chartdata_aggregate = generateAggregateChartData(); // includes separate group for Organics
    let table_data = generateTableData();
    comparison_data = generateComparisonChartData(); // removes separate group for Organics from "chartdata_aggregate"
    gc_data = getDataBlobAtIndex(4);

    buildCharts();
    displayTableData(table_data);
  }

}


/* ################################################################################################
  ***************  METHODS FOR GENERATING CHARTDATA FROM JAVASCRIPT DATA FILES ***************
################################################################################################### */

// ABRACADABRA

function generateChartData(){

  // retrieve the data from one of the JSON files based on the OS the user has selected
  // the index is the same index as what the API returns:
  // 0 == chart_formated_data
  // 1 == chart_formated_data_aggregate
  // 2 == daterange_pandas_tabledata()
  // 3 can be generated from #1 == daterange_pandas_comparison_chart()
  // 4 == giftcard_revenue()
  // so this one uses index 0, which means it's grabbing all the data for the chart from a specific OS
  
  // grab a reference to the data file we want to filter
  let data_to_use = getDataBlobAtIndex(0);
  
  // need to find the indexes where A) the date is between the dates selected with the date picker
  // AND B) the advertiser has been selected by the user
  // this will allow us to filter out all data we don't need
  let indexes_to_keep = [];

  for(let i=0; i < data_to_use.date.length; i++){

    let d_date = data_to_use.date[i];
    let d_advertiser = data_to_use.advertiser[i];

    if( (datepicker_start_date <= d_date && d_date <= datepicker_end_date ) && advertisers_chosen.includes(d_advertiser) ){
      indexes_to_keep[i] = true;
    }
    else{
      indexes_to_keep[i] = false;
    }

  }

  // create a new dictionary to load data into
  let data_filtered = {};

  // get the keys of the dictionary so we can iterate through them and load the new dictionary with the same keys
  let data_keys = Object.keys(data_to_use);

  // load the "data_filtered" dictionary with only the data we want from each key's list of data
  for (key of data_keys){
    data_filtered[key] = data_to_use[key].filter((d,i) => {
      return indexes_to_keep[i];
      // we could use this line of code and eliminate the need for creating the "indexes_to_keep" list.
      // but it would be slightly more confusing as to what we are doing and only save a little time.
      // return (datepicker_start_date <= data_to_use.date[i] && data_to_use.date[i] <= datepicker_end_date ) && advertisers_chosen.includes(data_to_use.advertiser[i])
    });
  }

  return data_filtered;

}


function generateAggregateChartData(){

  // need to transform "chartdata" into "chartdata_aggregate"
  // need to combine all values from each of the advertisers for each date into one value

  // create a new dictionary to load data into
  let aggregated_chartdata = {};

  // get the keys of the dictionary so we can iterate through them and load the new dictionary with the same keys
  let data_keys = Object.keys(chartdata);
  let summation_keys = data_keys.filter( (d,i) => {
    return (d != "advertiser" && d != "date")
  });

  // create a prototype dictionary using the same keys
  for(key of data_keys){
    aggregated_chartdata[key] = [];
  } 

  // grab a list of only the unique dates in the data
  let unique_dates = chartdata.date.filter( onlyUnique );  

  // for each unique_date, combine data together
  for(unique_date of unique_dates){

    let organic_data_present_for_this_date = false;
    let index_where_organic_data_was_found = 0;

    let paid_data_present_for_this_date = false;
    let paid_data_placeholder_dictionary = {};

    for(key of summation_keys){
      paid_data_placeholder_dictionary[key] = 0;
    }

    // search through the date list of the chartdata to find each instance of our unique set of dates
    chartdata.date.map( (date,i) =>{

      // if a match is found then...
      if(unique_date === date){
        // first check to see if the advertiser is "Organic"
        // if so, then set the value of the boolean that flags if 
        // this date had an organic value or not
        if(chartdata.advertiser[i] === "Organic"){
          organic_data_present_for_this_date = true;
          index_where_organic_data_was_found = i;
        }
        // if the date is not for the "Organic" advertiser then it's for one of the paid advertisers
        // this means we need to set the "paid_data_present_for_this_date" flag to be true
        // we also need to add the data in the same index for all of the other keys to the
        // paid placeholder dictionary
        else{
          paid_data_present_for_this_date = true;
          for(key of summation_keys){
            paid_data_placeholder_dictionary[key] += chartdata[key][i];
          }
        }
      }
    });

    // if there was one or more paid advertiser values for this date, push the values to the final dictionary
    if(paid_data_present_for_this_date){
      aggregated_chartdata.advertiser.push("Aggregate Paid");
      aggregated_chartdata.date.push(unique_date);
      for(key of summation_keys){
        let value_to_push = paid_data_placeholder_dictionary[key];
        aggregated_chartdata[key].push(value_to_push);
      }
    }

    // if there was an organic value for this date, push the values to the final dictionary
    if(organic_data_present_for_this_date){
      aggregated_chartdata.advertiser.push("Organic");
      aggregated_chartdata.date.push(unique_date);
      for(key of summation_keys){
        let value_to_push = chartdata[key][index_where_organic_data_was_found];
        aggregated_chartdata[key].push(value_to_push);
      }
    }

  }

  return aggregated_chartdata;
  
}




function generateTableData(){

  // create a list to use as keys for each advertiser's dictionary
  let table_data_metrics_keys = [
                                  // "advertiser",
                                  "clicks", 
                                  "impressions", 
                                  "installs",
                                  // "ltv_premium_membership_all",
                                  // "ltv_premium_membership_revenue",
                                  "ltv_subs_all",
                                  "ltv_subs_revenue",
                                  // "ltv_text_chat_all",
                                  // "ltv_text_chat_revenue",
                                  "new_workout_saved_unique",
                                  "sessions",
                                  "spend",
                                  "trial_starts_all",
                                  "views"
                                ]

  // create a list to hold all potential advertiser's aggregate dictionaries
  let table_data = [];

  
  let advertisers_to_use = advertisers_chosen;

  // if we are not usin the flask app, then we need to filter out the 
  // Google and ASA advertisers if they are chosen
  if(using_flask_app === false){
    // in the case that Android is the only OS chosen, we want to only allow certain advertisers
    if(os_chosen.length === 1 && os_chosen.includes("ANDROID")){

      // this will filter out only the advertisers we are using for Android
      advertisers_to_use = advertisers_chosen.filter(x => ["Facebook Ads", "pinterest_int", "snapchat_int"].includes(x));

      // we also want to add Organic if that one is selected
      if(advertisers_chosen.includes("Organic")){
        advertisers_to_use.push("Organic");
      }
    }
  }


  // console.log(advertisers_to_use);

  // cycle through the list of chosen advertisers and create a proto dictionary for each
  for(advertiser of advertisers_to_use){

    let placeholder_dictionary = {
                                    "advertiser": advertiser
                                 };

    for(key of table_data_metrics_keys){
      placeholder_dictionary[key] = 0;
    }

    // push each proto-dictionary to the list
    table_data.push(placeholder_dictionary);
  }

  // since the advertiser name is not being used as a key into each dictionary, we need to
  // create a list that corresponds to each advertiser's placement within the table_data list
  let index_of_each_advertiser_in_tabledata_list = [];
  
  for(let i=0; i < table_data.length; i++){
    index_of_each_advertiser_in_tabledata_list.push(table_data[i].advertiser);
  }

  // iterate through the entire chartdata.advertiser array and combine the metrics for each advertiser
  chartdata.advertiser.map( (advertiser,i) =>{

    let index_of_advertiser = index_of_each_advertiser_in_tabledata_list.indexOf(advertiser);

    for(key of table_data_metrics_keys){
      table_data[index_of_advertiser][key] += chartdata[key][i];
    }

  });

  // return a version sorted by spend descending
  return table_data.sort(function(a, b){
    return b.spend - a.spend;
  });
}


// all this really does is remove ORGANICS from the "chartdata_aggregate"
// and also whittles down the number of metrics we keep in the dataset
function generateComparisonChartData(){

      let all_comparison_chart_data = {};
      // we actually only need these keys to be in the dictionary 
      // because for the comparison chart, these are the only metrics we use
      let keys_to_keep = ["date", "spend", "trial_starts_all", "ltv_subs_all", "ltv_subs_revenue"];

      // we want to run the following operations for both the regular chartdata AND the aggregate
      // that way we can pull either the single advertiser's information, or the aggregate data in the
      // comparisonChart() function where we actually generate the chart
      [chartdata, chartdata_aggregate].map( data_to_use => {
        // find all the advertisers selected that are not Organic
        let unique_paid_advertisers = data_to_use.advertiser.filter( onlyUnique ).filter( x => x !== "Organic");

        // in the case that Android is the only OS chosen, we want to only allow certain advertisers
        if(os_chosen.length === 1 && os_chosen.includes("ANDROID")){
          unique_paid_advertisers = unique_paid_advertisers.filter(x => ["Facebook Ads", "pinterest_int", "snapchat_int"].includes(x));
        }

        // for all the advertisers selected, create a dictionary with each advertiser as a top level key
        // then the value of that key will be the information needed for the chart series for that advertiser
        unique_paid_advertisers.map((advertiser,i) => {
          // create a new dictionary to load data into
          let advertiser_comparison_data = {};

          // load the "advertiser_comparison_data" dictionary with only the date and metrics (keys) we care about for comparison charts
          for (key of keys_to_keep){
            advertiser_comparison_data[key] = data_to_use[key].filter((d,i) => {
              // return indexes_of_data_to_keep[i];
              // we could use this line of code and eliminate the need for creating the "indexes_of_data_to_keep" list.
              // but it would be slightly more confusing as to what we are doing and only save a little time.
              return (data_to_use.advertiser[i] === advertiser);
            });
          }

          all_comparison_chart_data[advertiser] = advertiser_comparison_data;

        });
      });

      // THE FINAL DICTIONARY WILL LOOK LIKE THIS
      //{
      // date: ["2020-02-10", "2020-02-11", etc.....]
      // advertiser: ["Aggregate Paid", "Aggregate Paid", etc.....]
      // spend: [1460.83, 1168.31, etc.....]
      // trial_starts_all: [101, 81, etc.....]
      // ltv_subs_all: [10, 2, etc.....]
      // ltv_subs_revenue: [475.2760479755903, 134.31296573571356, etc.....]
      //}

      return all_comparison_chart_data;
}

function getDataBlobAtIndex(data_blob_index){
  let data_to_use = [];

  switch (os_chosen.length) {
    case 1:
      if(os_chosen[0] === "IOS"){
        data_to_use = data_alltime_ios[data_blob_index];
      }
      else if(os_chosen[0] === "ANDROID"){
        data_to_use = data_alltime_android[data_blob_index];
      }
      break;
    case 0:
    case 2:
      data_to_use = data_alltime_both[data_blob_index];
      break;
    default:
      console.log("something went wrong generating chart data");
  }

  return data_to_use;
}

/* ################################################################################################
  *******************  EVENT HANDLERS WITHOUT API CALLS *******************
################################################################################################### */

function updateMetricsSelection(callBuildCharts){

  metrics_chosen = get_checkbox_choices(".MetricsCheckbox");

  // console.log(metrics_chosen);

  // if all the metrics boxes are unchecked, we want to warn the user
  // by highlighting the "SELECT Metric(s)" text
  // the reason this is "1" and not "0" is because we have a hidden metric checkbox
  // that is always checked in order to make the y-axis show up when no metrics
  // are showing in the plot area. it's a hack but it works
  if(metrics_chosen.length <= 1){
    highlight_text_with_class(".select_metrics_header_text", true);
  }
  else{
    highlight_text_with_class(".select_metrics_header_text", false);
  }

  // callBuildCharts is only sent in when called by the init function
  if(callBuildCharts !== false){
    
    // buildCharts(chartdata, comparison_data);  
    buildCharts();
    // buildChartsWithChoices(chartdata);
  }


}



function updateAdditionalControls(){

  // let cb = this.value;

  let chosenCheckBox = this.value;//cb.property("value");
  let isChecked = this.checked;//cb.property("checked");

  switch (chosenCheckBox) {
    case "stacked":
      displayStackedGraph = isChecked;
      
      d3.selectAll(".highlightable_metric").each( function(d) {
        let element = d3.select(this); // gets a reference to the element

        if(displayStackedGraph) {
          // element.style({"color":"green"});
          // element.style('border', '5px black solid');
          // element.style('background', '#ff0000');
          // element.style('text-shadow', '1px 1px #000000');
          
          element.style('font-weight', 'bold');
          element.style('font-style', 'italic');
        }
        else{
          element.style('font-weight', 'initial');
          element.style('font-style', 'initial');
        }

      });
      
      // ORIGINAL ATTEMPT AT DOING SOMETHING WITH THE CHECKBOXES THEMSELVES
      // // loop through and highlight or clear highlighting
      // // for each checkbox associated with a metric that is stackable
      // d3.selectAll(".MetricsCheckbox").each( function(d) {
    
      //   let cb = d3.select(this); // gets a reference to the checkbox
      //   let cb_metric = cb.property("value"); // gets the name of the metric

      //   let metric_is_stackable = ( metrics_info[cb_metric].stack_group != "none" ); // metric is stackable
      //   let metric_visible = ( !cb.property("disabled") ); // metric is enabled and visible in the app (not disabled)
        
        
      //   // if the metric is stackable and visible to the user
      //   // then we can apply highlighting or remove highlighting
      //   if( metric_is_stackable && metric_visible){
          
      //     // if the "stacked" checkbox has been checked
      //     // then we want to highlight the metric
      //     if(displayStackedGraph) {
      //       console.log("apply metrics highlight");
      //       // cb.style({'stroke': 'black', 'stroke-width': 2})
      //       // cb.style({"color":"green"});
      //       cb.style('border', '5px black solid');
      //     }
      //     // otherwise, remove highlighting
      //     else{
      //       console.log("remove metrics highlight");
      //       // cb.style({'stroke': 'none', 'stroke-width': 0})
      //     }
      //   }
      // });
      
      break;
    case "aggregate_advertisers":
      displayAggregateAdvertisers = isChecked;

      // select the checkbox
      let totalRoasGC_checkbox = d3.selectAll(".MetricsCheckbox[value='total_roas_gc']");
      let totalRoas_checkbox = d3.selectAll(".MetricsCheckbox[value='total_roas']");

      // if "displayAggregateAdvertisers" == true
      if(displayAggregateAdvertisers === true){
        
        // enabled the "Total+GC" checkbox (value == "total_roas_gc")
        totalRoasGC_checkbox.property('disabled', false);

      }
      // else if "displayAggregateAdvertisers" == false
      else if(displayAggregateAdvertisers === false){

        // if the "Total+GC" checkbox is currently checked
        if(totalRoasGC_checkbox.property("checked")){

          // we need to uncheck "Total+GC" checkbox
          totalRoasGC_checkbox.property('checked', false);
          
          // and check the "Total" box instead if it isn't already checked
          totalRoas_checkbox.property('checked', true);
        }
        
        // now we need to disable the checkbox
        totalRoasGC_checkbox.property('disabled', true);
        
        // we also need to update the MetricsSelection list 
        // but we don't want to call call buildCharts() 
        // since we'll do this further down the code
        //  so we send "false" parameter
        updateMetricsSelection(false);
      }

      // console.log("stacked is", isChecked);
      break;
    // case "giftcard_revenue":
    //   showGiftCard = isChecked;
    //   break;
    case "movingaverage":
      // console.log("is movingaverage checked?", isChecked);
      return;      
    case "overtime":
      // check to make sure there was an actual state change and if so, do stuff
      // why am I checking if there was a state change? I can't rememeber!
      if(displayComparisonChart == isChecked){
        displayComparisonChart = !isChecked;
        set_metrics_visibility_state();
      }
      break;    
    case "comparison":
      // check to make sure there was an actual state change and if so, do stuff
      // why am I checking if there was a state change? I can't rememeber!
      if(displayComparisonChart != isChecked){
        displayComparisonChart = isChecked;
        set_metrics_visibility_state();
      }
      break;       
    default:
      console.log("need to add '" + chosenCheckBox + "' checkbox to switch statement");
  }

  
  // buildCharts(chartdata, comparison_data);  
  buildCharts();  
}



/* ################################################################################################
  *******************  OTHER CHART BUILDING FUNCTIONS *******************
################################################################################################### */
function updateComparisonType(){

  comparisonChartType = this.value; // "spend_vs_gm"

  // buildCharts(chartdata, comparison_data);  
  buildCharts();  
}


function setYaxisMaxValue(){

  switch (this.name) {
    case "set_y1axis_range":
        y1AxisMaxValue = (this.value === "") ? 0 : +this.value;
        break;
    case "set_y2axis_range":
        y2AxisMaxValue = (this.value === "") ? 0 : +this.value;
      break;
    default:
      // console.log("need to add '" + comparisonChartType + "' radio button to switch statement");
  }
  

  // console.log("name of input", this.name);

  // buildCharts(chartdata, comparison_data);  
  buildCharts();  
}


function showTheLTVPerTrial(){

  // showLTVPerTrial = this.value;
  showLTVPerTrial = this.checked; 

  // console.log("showLTVPerTrial value", showLTVPerTrial)

  // buildCharts(chartdata, comparison_data);  
  buildCharts();  

}

function setLTVValue(){

  customLTV = (this.value === "") ? 0 : +this.value;

  // buildCharts(chartdata, comparison_data);  
  buildCharts();  
}


/* ################################################################################################
  *******************  HELPER FUNCTIONS  *******************
################################################################################################### */

function get_checkbox_choices(checkbox_type){

  let choices = [];
  // OS should start out as "IOS"
  // sync the os Checkboxes with HTML
  d3.selectAll(checkbox_type).each( function(d) {
    
    // console.log("yeahhh boyyyeeeee");

    let cb = d3.select(this);

    if(cb.property("checked")){

      // console.log("checkbox is checked");
      let chosenCheckBox = cb.property("value");

      choices.push(chosenCheckBox);
    }

  });

  return choices;

}

function highlight_text_with_class(class_to_highlight, highlight){
  
  d3.selectAll(class_to_highlight).each( function(d) {
    let element = d3.select(this); // gets a reference to the element

    if(highlight){
    
      // console.log("attempting to highlight text");
      // element.style({"color":"green"});
      // element.style('border', '5px black solid');
      // element.style('background', '#ff0000');
      // element.style('text-shadow', '1px 1px #000000');
      
      // element.style('font-weight', 'bold');
      element.style('font-style', 'italic');
      element.style('color', 'red');
    }
    else{
      // element.style('font-weight', 'initial');
      element.style('font-style', 'initial');
      element.style('color', 'initial');
    }

  });

}


function createAPICallString(api_call_base, key, values){

  let api_call_string = api_call_base;

  values.map((value, i) => {
    if(i === 0){
      api_call_string = api_call_string + "?" + key + "1=" + value;
    }
    else {
      api_call_string = api_call_string + "&" + key + String(i+1) + "=" + value;
    }
  });

  return api_call_string;

}


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}

function set_metrics_visibility_state(){

  // showComparison = (displayComparisonChart === true) ? true : false;

  let line_graph_metrics = d3.selectAll(".visible-for-line-graph").classed("HiddenElement", displayComparisonChart);
  let comparison_chart_metrics = d3.selectAll(".visible-for-comparison-chart").classed("HiddenElement", !displayComparisonChart);


}

function setTraceVisibility(metric){

  if(metrics_info[metric].name === "y1"){
    return false;
  }

  return true;
}

function setStackGroup(metric){

  let stackGroup = metrics_info[metric].stack_group;

  if(displayStackedGraph === true && stackGroup !== "none"){
    if(stackGroup === "default"){
      return metrics_info[metric].name;
    }

    return stackGroup;
  }

  return [];
}


function setFillMode(metric){

  if(metric == "roas" && (metrics_chosen.includes("total_roas") || metrics_chosen.includes("total_roas_gc") ) ){
    return 'tonexty';
  }
  else if(metric == "total_roas" && metrics_chosen.includes("total_roas_gc") ){
    return 'tonexty';
  }
  
  return "";
}

function setComparisonChartHoverText(xvals, yvals, charttype){
  console.log("we are here");
}



function setHoverText(data, metric, advertiser){
  //   "cpi": "spend/installs",
  //   "arpu": "revenue/installs",
  //   "cpt": "spend/trials",
  //   "arp_trial": "revenue/trials",
  //   "roas": "( (revenue/spend) - 1 ) * 100 ",
  //   "trials_per_user": "( (trials/installs) - 1 ) * 100 ",
  //   "subs_per_trial": "( (subs/trials) - 1 ) * 100 ",
  let hovertext_series = [];

  data.advertiser.map((d, i) => {
    if (d === advertiser){
      
      let formattedDate = moment(data["date"][i]).format('ddd, MM/DD'); //.format('ddd, MMM D') 
      let yval = 0;

      if(metric === "spend" || metric === "ltv_subs_revenue"){
        yval = metrics_info[metric].symbol + data[metric][i].toFixed(2);
        // advertiser_series.push( (data["spend"][i] / data[metric_divisor_lookup[metric]][i]).toFixed(2) );
      }      
      else if(metric === "cpi" || metric === "arpu" || metric === "cpt" || metric === "arp_trial"){
        yval = metrics_info[metric].symbol + (data[metrics_info[metric].numerator][i] / data[metrics_info[metric].divisor][i]).toFixed(2);
        // advertiser_series.push( (data["spend"][i] / data[metric_divisor_lookup[metric]][i]).toFixed(2) );
      }
      else if(metric === "roas" || metric === "total_roas" || metric === "total_roas_gc"){ // roas and total_roas  || metric === "total_roas"

        let numeratorVal = 0;
        
        metrics_info[metric].numerator.map( numeratorMetric => {

          let value_to_add = 0;

          if(numeratorMetric === "gc_revenue"){

            // get the index into the GC array based on the date
            // sometimes the GC data is missing dates, so we need to make sure
            // we're not indexing into it incorrectly
            let index_for_gc = gc_data["date"].indexOf(data["date"][i]);

            if(displayAggregateAdvertisers && advertiser === "Aggregate Paid" && index_for_gc !== -1){
              
              value_to_add = gc_data["gc_revenue"][index_for_gc];

              if(value_to_add === undefined){
                value_to_add = 0;
              }

            }
          }
          else{
            value_to_add = data[numeratorMetric][i];
          }

          numeratorVal += value_to_add;

        });

        yval = ( (( numeratorVal / data[metrics_info[metric].divisor][i]) - 1) * 100 ).toFixed(2) + "%";
        // yval = ( ((data[metrics_info[metric].numerator][i] / data[metrics_info[metric].divisor][i]) - 1) * 100 ).toFixed(2) + "%";
        // advertiser_series.push( (data["ltv_subs_revenue"][i] / data[metric_divisor_lookup[metric]][i]).toFixed(2) );
      }
      else if(metric === "trials_per_user" || metric === "subs_per_trial"){ // trials_per_user OR subs_per_trial
        yval = ( (data[metrics_info[metric].numerator][i] / data[metrics_info[metric].divisor][i]) * 100 ).toFixed(2) + "%";
        // advertiser_series.push( (data["ltv_subs_revenue"][i] / data[metric_divisor_lookup[metric]][i]).toFixed(2) );
      }
      else if(metric === "yaxis_placeholder"){ // trials_per_user OR subs_per_trial
        yval = 0;
      }
      else{
        yval = metrics_info[metric].symbol + data[metric][i];
      }

      // console.log("val type", typeof(yval));
      // console.log("value", yval);
      let hovertext = yval + " (" + formattedDate + ")";

      hovertext_series.push(hovertext);
      
    }

  });

  return hovertext_series;

}


// this delegates what the Y axis range is when a number is set in the y1 or y2 max
function setAxisRangeWhenEmpty(emptyRangeValue){

  metrics_chosen.map(metric => {
    if(metrics_info[metric].yaxis === "y1" && metrics_info[metric].name !== "y1"){
      // console.log("setAxisRangeWhenEmpty", metrics_info[metric].yaxis);//, metrics_info[metric].name);
      return [];
    }
  });
  
  return emptyRangeValue;
}


function setAxisLabelsAndGridVisibility(){
  
  let num_y_axis_metrics_chosen = 0;

  metrics_chosen.map(metric => {
    // if(metrics_info[metric].yaxis === "y1" && metrics_info[metric].name !== "y1"){
    //   return [];
    // }
    if(metrics_info[metric].yaxis === "y1"){
      num_y_axis_metrics_chosen += 1;
    }
  });

  if(num_y_axis_metrics_chosen <= 1){
    return false;
  }

  return true;
}

/* ################################
  ****  Takes the shortname of an axis ("y1", "y2", or "y3"), 
  ****      figures out which metrics in the global "metrics_chosen" array
  ****      are utilizing this axis and returns a string which will be
  ****      the name of the axis */
function nameYAxisTitle(axis_shortname){

  let axis_name = axis_shortname;
  // console.log("Given Axis: ", axis_shortname);

  metrics_chosen.map( (metric) => {
    
    // console.log("Metric Axis: ", metrics_info[metric].yaxis);
    
    if(metrics_info[metric].yaxis === axis_shortname && metrics_info[metric].name !== axis_shortname){
      axis_name = axis_name + " (" + metrics_info[metric].name + ")";
    }
  });

  // if there are no metrics using the y1 axis, set the name to be blank
  if(axis_name === "y1"){
    axis_name = "";
  }

  return axis_name;
}


/* ################################
  ****  NEWEST MAPING DATA TO METRICS */
function getOvertimeGraphYValues(data, metric, advertiser) {

  //   "cpi": "spend/installs",
  //   "arpu": "revenue/installs",
  //   "cpt": "spend/trials",
  //   "arp_trial": "revenue/trials",
  //   "roas": "( (revenue/spend) - 1 ) * 100 ",
  //   "trials_per_user": "( (trials/installs) - 1 ) * 100 ",
  //   "subs_per_trial": "( (subs/trials) - 1 ) * 100 ",

  advertiser_series = [];

  data.advertiser.map((d, i) => {
    if (d === advertiser){
      // console.log("series ", series);
      // console.log("advertiser ", advertiser);
      // console.log("value ", data[series][i]);
      if(metric === "spend" || metric === "ltv_subs_revenue"){
        // console.log("spend or revenue", data[metric][i]);
        advertiser_series.push( parseFloat(data[metric][i].toFixed(2)) );
        // advertiser_series.push( data[metric][i].toFixed(2) );
        // advertiser_series.push( (data["spend"][i] / data[metric_divisor_lookup[metric]][i]).toFixed(2) );
      }    
      else if(metric === "cpi" || metric === "arpu" || metric === "cpt" || metric === "arp_trial"){
        advertiser_series.push( parseFloat((data[metrics_info[metric].numerator][i] / data[metrics_info[metric].divisor][i]).toFixed(2)) );
        // advertiser_series.push( (data["spend"][i] / data[metric_divisor_lookup[metric]][i]).toFixed(2) );
      }
      else if(metric === "roas" || metric === "total_roas" || metric === "total_roas_gc"){ // roas or total_roas

        let numeratorVal = 0;
        
        metrics_info[metric].numerator.map( numeratorMetric => {
          
          let value_to_add = 0;

          if(numeratorMetric === "gc_revenue"){

            // get the index into the GC array based on the date
            // sometimes the GC data is missing dates, so we need to make sure
            // we're not indexing into it incorrectly
            let index_for_gc = gc_data["date"].indexOf(data["date"][i]);

            if(displayAggregateAdvertisers && advertiser === "Aggregate Paid" && index_for_gc !== -1){

              value_to_add = gc_data["gc_revenue"][index_for_gc];

              if(value_to_add === undefined){
                value_to_add = 0;
              }
              
            }
          }
          else{
            value_to_add = data[numeratorMetric][i];
          }
          
          numeratorVal += value_to_add;
          
        });

        advertiser_series.push( parseFloat(( ( (numeratorVal / data[metrics_info[metric].divisor][i]) - 1) * 100 ).toFixed(2)) );
        // advertiser_series.push( parseFloat(( ((data[metrics_info[metric].numerator][i] / data[metrics_info[metric].divisor][i]) - 1) * 100 ).toFixed(2)) );
        // advertiser_series.push( (data["ltv_subs_revenue"][i] / data[metric_divisor_lookup[metric]][i]).toFixed(2) );
      }
      else if(metric === "trials_per_user" || metric === "subs_per_trial"){ // trials_per_user OR subs_per_trial
        advertiser_series.push( parseFloat(( (data[metrics_info[metric].numerator][i] / data[metrics_info[metric].divisor][i]) * 100 ).toFixed(2)) );
        // advertiser_series.push( (data["ltv_subs_revenue"][i] / data[metric_divisor_lookup[metric]][i]).toFixed(2) );
      }
      else if(metric === "yaxis_placeholder"){ // trials_per_user OR subs_per_trial
        advertiser_series.push(0);
        // advertiser_series.push(( (data[metrics_info[metric].numerator][i] / data[metrics_info[metric].divisor][i]) * 100 ).toFixed(2) );
        // advertiser_series.push( (data["ltv_subs_revenue"][i] / data[metric_divisor_lookup[metric]][i]).toFixed(2) );
      }
      else{
        advertiser_series.push(data[metric][i]);
      }

    }
  });

  return advertiser_series;

}


function getOvertimeGraphXValues(data, series, advertiser) {

  advertiser_series = [];

  data.advertiser.map((d, i) => {
    if (d === advertiser){
      // console.log("series ", series);
      // console.log("advertiser ", advertiser);
      // console.log("value ", data[series][i]);
      advertiser_series.push(data[series][i]);
    }
  });

  return advertiser_series;

}


function getComparisonChartXValues(data_set, return_ltv_or_actual){

  let xAxisValues = [];
  let xAxisLTVValues = [];

  switch (comparisonChartType) {
    case "spend_vs_roi":
    case "spend_vs_revenue":
    case "spend_vs_gm": // x values are just spend
        xAxisValues = data_set.spend;
        xAxisLTVValues = data_set.spend;
      break;
    // case "spend_vs_gm":
    //     xAxisValues = data_set.ltv_subs_revenue.map((revenue, i) => {
    //     return numberWithCommas((revenue - data_set.spend[i]).toFixed(2));
    //   });
    //   // console.log("is movingaverage checked?", isChecked);
    //   break;
    case "gm_vs_roi": // x values are just the gross margin
        xAxisValues = data_set.ltv_subs_revenue.map((revenue, i) => {
          return numberWithCommas((revenue - data_set.spend[i]).toFixed(2));
        });

        xAxisLTVValues = data_set.trial_starts_all.map((trials, i) => {
          return numberWithCommas(((trials * customLTV) - data_set.spend[i]).toFixed(2));
        });    

        // console.log("is movingaverage checked?", isChecked);
        break;
    // case "gm_vs_roi":
    //     // ${( tempData.ltv_subs_revenue / tempData.spend * 100 ).toFixed(2)}%
    //     xAxisValues = data_set.ltv_subs_revenue.map((revenue, i) => {
    //       return ( ( (revenue / data_set.spend[i]) - 1 ) * 100 ).toFixed(2);
    //     });
    //     // console.log("is movingaverage checked?", isChecked);
    //     break;
    default:
      console.log("need to add '" + comparisonChartType + "' radio button to switch statement");
  }
  
  // return xAxisValues;
  return (return_ltv_or_actual === "LTV") ? xAxisLTVValues : xAxisValues;
}



function getComparisonChartYValues(data_set, return_ltv_or_actual){

  let yAxisValues = [];
  let yAxisLTVValues = [];

  switch (comparisonChartType) {
    case "spend_vs_revenue": // y values are revenue
      yAxisValues = data_set.ltv_subs_revenue;
      
      yAxisLTVValues = data_set.trial_starts_all.map((trials, i) => {
        return numberWithCommas( (trials * customLTV).toFixed(2) );
      });
      break;
    case "spend_vs_gm": // y values are gross margi
      yAxisValues = data_set.ltv_subs_revenue.map((revenue, i) => {
        return numberWithCommas((revenue - data_set.spend[i]).toFixed(2));
      });

      yAxisLTVValues = data_set.trial_starts_all.map((trials, i) => {
        return numberWithCommas( ((trials * customLTV) - data_set.spend[i]).toFixed(2) );
        // return numberWithCommas( (trials * customLTV).toFixed(2) );
      });      
      // console.log("is movingaverage checked?", isChecked);
      break;
    case "spend_vs_roi":
    case "gm_vs_roi": // y values are ROI
        yAxisValues = data_set.ltv_subs_revenue.map((revenue, i) => {
          return ( ( (revenue / data_set.spend[i]) - 1 ) * 100 ).toFixed(2);
        });

        yAxisLTVValues = data_set.trial_starts_all.map((trials, i) => {
          return ( ( ((trials * customLTV) / data_set.spend[i]) - 1 ) * 100 ).toFixed(2);
          // return numberWithCommas( (trials * customLTV).toFixed(2) );
        });           
        // console.log("is movingaverage checked?", isChecked);
        break;
    // case "gm_vs_roi":
    //     // ${( tempData.ltv_subs_revenue / tempData.spend * 100 ).toFixed(2)}%
    //     yAxisValues = data_set.ltv_subs_revenue.map((revenue, i) => {
    //       return ( ( (revenue / data_set.spend[i]) - 1 ) * 100 ).toFixed(2);
    //     });
    //     // console.log("is movingaverage checked?", isChecked);
    //     break;
    default:
      console.log("need to add '" + comparisonChartType + "' radio button to switch statement");
  }
  
  return (return_ltv_or_actual === "LTV") ? yAxisLTVValues : yAxisValues;
}



/* ################################
  ****  INITIALIZATION FUNCTIONS
################################### */

function init(){

  // clear all HTML in the div with ID "linegraph" so that it's
  // clean and ready for the graph to be drawn
  d3.selectAll("#linegraph").html("");

  (using_flask_app) ? init_with_flask_app() : init_with_static_data();

}

function init_with_static_data() {
  console.log("init with static data");

  os_chosen = ["IOS", "ANDROID"];
  advertisers_chosen = ["Facebook Ads"];
  metrics_chosen = ["spend"];

  //abracadabra
  // if the global variable that says we should scale the last 8 days is set to true
  // we want to scale the last 8 days of subscribers/revenue data to make it 
  // appear to be more naturally representative of what happens with a subscription based business
  if( scale_down_last_8_days_revenue ){

    let one_day_ago =     moment().subtract(1, 'days').format('YYYY-MM-DD');
    let two_days_ago =    moment().subtract(2, 'days').format('YYYY-MM-DD');
    let three_days_ago =  moment().subtract(3, 'days').format('YYYY-MM-DD');
    let four_days_ago =   moment().subtract(4, 'days').format('YYYY-MM-DD');
    let five_days_ago =   moment().subtract(5, 'days').format('YYYY-MM-DD');
    let six_days_ago =    moment().subtract(6, 'days').format('YYYY-MM-DD');
    let seven_days_ago =  moment().subtract(7, 'days').format('YYYY-MM-DD');
    
    let scale_values = {};
    
    scale_values[todays_date]       = { "min_val": 0.0001, "max_val": 0.02 };
    scale_values[one_day_ago]       = { "min_val": 0.0001, "max_val": 0.02 };
    scale_values[two_days_ago]      = { "min_val": 0.0001, "max_val": 0.05 };
    scale_values[three_days_ago]    = { "min_val": 0.0001, "max_val": 0.09 };
    scale_values[four_days_ago]     = { "min_val": 0.0001, "max_val": 0.09 };
    scale_values[five_days_ago]     = { "min_val": 0.01, "max_val": 0.12 };
    scale_values[six_days_ago]      = { "min_val": 0.03, "max_val": 0.15 };
    scale_values[seven_days_ago]    = { "min_val": 0.11, "max_val": 0.22 };
    scale_values[revenueCutoffDate] = { "min_val": 0.35, "max_val": 0.65 };

    // we want to iterate through the data objects for ios, android, and both operating systems
    for(data_to_use of [ data_alltime_ios[0], data_alltime_android[0], data_alltime_both[0] ]){
    // for(data_to_use of [ data_alltime_ios[0] ]){

      // now we need to iterate through every index in the date column
      for(let i=0; i < data_to_use.date.length; i++){

        let d_date = data_to_use.date[i];
        
        // if the date in this index is between today
        // and 8 days ago (the revenue cutoff date)
        // then we want to scale the subscribers and revenue down
        if( revenueCutoffDate <= d_date && d_date <= todays_date ){
          let scale_min = scale_values[d_date].min_val;
          let scale_max = scale_values[d_date].max_val;
          
          // multiply a random float value between 0 and 1 by the difference
          // between the max and min scale values and then add the min
          // scale value. this is how to create a random value between the max/min
          let scale_factor = Math.random() * (+scale_max - +scale_min) + +scale_min;
          let subs_val = data_to_use.ltv_subs_all[i];
          let revenue_val = data_to_use.ltv_subs_revenue[i];

          data_to_use.ltv_subs_all[i] = Math.floor(subs_val * scale_factor);

          data_to_use.ltv_subs_revenue[i] = revenue_val * scale_factor;

          // in the case where we scaled the number of subscribers to 0
          // but there was some revenue generated, we want to set the
          // revenue to 0 so that we don't have a situation
          // where there is revenue but no subscribers
          if(data_to_use.ltv_subs_revenue[i] > 0 && data_to_use.ltv_subs_all[i] == 0){
            data_to_use.ltv_subs_revenue[i] = 0.00;
          }


          // IF THE DATE IS TODAY'S DATE, SCALE ALL THE OTHER METRICS BY A SEMI RANDOM AMOUNT
          // FOR THE TRIAL STARTS METRIC SCALE DOWN MORE THAN THE OTHERS
          if(d_date == todays_date){
            
            let metrics_to_scale = ["spend", "impressions", "views", "clicks", "installs", "sessions", "new_workout_saved_unique", "trial_starts_all"]

            metrics_to_scale.map( metric => {

              let max_scale = 0.50;
              let min_scale = 0.35;

              if(metric === "trial_starts_all"){
                max_scale = 0.25;
                min_scale = 0.15;
              }

              let scale_by = Math.random() * (+max_scale - +min_scale) + +min_scale;
              let metric_value = data_to_use[metric][i];

              if(metric === "spend"){
                data_to_use[metric][i] = metric_value * scale_by;
              }
              else{
                data_to_use[metric][i] = Math.round(metric_value * scale_by);
              }
            });
          }
        }
      }
    }
  }

  // console.log(os_chosen);
  // console.log(advertisers_chosen);
  // console.log(metrics_chosen);

  // Create our Plotly object for the first time with some random data
  var data = [{
    x: [0],
    y: [0],
    type: 'scatter'
  }];

  Plotly.newPlot(myPlotDiv, data);

  updateMetricsSelection(false);

}



function init_with_flask_app() {
  console.log("init function will sync the checkboxes' 'checked' state to the server settings and set UI elements accordingly");
  
  set_metrics_visibility_state();

  let api_call = "/api/v1.0/frontend_init"; 

  console.log(api_call);

  // let cb = d3.selectAll(".OSCheckbox[value='IOS']");
  // console.log("checkbox property == ", cb.property("value"));
  // console.log("is it checked? == ", cb.property("checked"));

  // makes the above API call 
  d3.json( api_call ).then((chosenCheckboxes) => {

    // index 0 returns a list of value names for the OS Checkboxes that are 'checked'
    // index 1 returns a list of value names for the Advertiser Checkboxes that are 'checked'
    let os_chosen = chosenCheckboxes[0];
    
    let checkbox = "";

    if(os_chosen.length === 1 && os_chosen.includes("IOS")){
      checkbox = "IOS";
    }
    else if(os_chosen.length === 1 && os_chosen.includes("ANDROID")){
      checkbox = "ANDROID";
    }
    else{
      checkbox = "BOTH";
    }

    let selectStatement = ".OSCheckbox[value='" + checkbox + "']";
    d3.selectAll(selectStatement).property("checked", true);

    // console.log("os_chosen ============= ", os_chosen); 


    let advertiserCheckboxes = chosenCheckboxes[1];

    advertiserCheckboxes.map( (checkbox) => {

      selectStatement = ".AdvertiserCheckbox[value='" + checkbox + "']";

      d3.selectAll(selectStatement).property("checked", true);
    });

    // Create our Plotly object for the first time with some random data
    var data = [{
      x: [0],
      y: [0],
      type: 'scatter'
    }];
  
    Plotly.newPlot(myPlotDiv, data);

    // adding the "false" means it will not try to display the graph
    // this is good because otherwise we'll be trying to display the graph 2x in a row
    updateMetricsSelection(false);
    
  });
  
}


/* ################################
  ****  INITIALIZATION CALLS
################################### */
// Initialize the dashboard
// init_sql();
init();

d3.selectAll(".OSCheckbox").on("change", updateOSSelection);
d3.selectAll(".AdvertiserCheckbox").on("change", updateAdvertiserSelection);
d3.selectAll(".MetricsCheckbox").on("change", updateMetricsSelection);
d3.selectAll(".GraphModifierCheckBox").on("change", updateAdditionalControls);
d3.selectAll(".ComparisonMetrics").on("change", updateComparisonType);
d3.selectAll(".YAxisRangeSetter").on("keyup", setYaxisMaxValue);
d3.selectAll(".LTVPerTrialCheckbox").on("change", showTheLTVPerTrial);
d3.selectAll(".LTVPerTrialSetter").on("keyup", setLTVValue);

