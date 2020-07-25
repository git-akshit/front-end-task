import React, {Component} from 'react';
import './page.css';
import Card from './card';

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fetchingData: true,
          data: null,
          start:0,
          end:9,
          total_pages: null
        }
      }

      componentDidMount(){
        const getData = () => {
            const url = './colleges.json'
            fetch(url).then(response => {
                return response.json();
              }).then(collegesData => {
                const limitedData = [];
                for (var i = 0; i <= this.state.end;i++){
                  limitedData.push(collegesData.colleges[i])
                }
                this.setState(
                  {
                    fetchingData: false,
                    data: limitedData
                })
                console.log(this.state.data)
              }).catch(err => {
                // Do something for an error here
                console.log("Error Reading data " + err);
              });

        }
        getData();

         this.loadMore =() => {
          this.setState(
            prevState => ({
              end: prevState.end < 40 ? prevState.end + 10 : 49,
              scrolling: true
            }),
            getData()
          )
        };

        this.handleScroll = () => { 
          var lastLi = document.querySelector("div.container > div:last-child");
          var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
          console.log('i',lastLi)
          var pageOffset = window.pageYOffset + window.innerHeight;
        if (pageOffset >= lastLiOffset) {
               this.loadMore();
          }
        };

        this.scrollListener = window.addEventListener("scroll", e => {
          this.handleScroll(e);
        });
  
      }
      

    render(){
      
        return (
           <div className='main-container'>
              <div>
                Colleges in North India
              </div>
               {this.state.data != null ?
               <div className='container'>
               
                 {this.state.data.map(collegeData =>
                   <Card college={collegeData}/>
                  )}
                 
                </div>
                :null
                   }
           </div>
           
        );
    }
};