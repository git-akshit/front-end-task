import React, {Component} from 'react';
import './card.css';
import Promoted from './promoted';
import { thisExpression } from '@babel/types';


export default class Card extends Component {
    constructor(props) {
        super(props);
      }
    render(){
        const stars = [];
        const emptyStars = [];

        const nearestPlacesString = this.props.college.famous_nearest_places;

        const  nearestPlacesArray = nearestPlacesString.split(' ');

        const offerTextArray = this.props.college.offertext.split(' ');

        for (let i=0; i < this.props.college.rating;i++){
            stars.push(i);
        }
        for (let i=0; i < 5 - this.props.college.rating;i++){
            emptyStars.push(i);
        }
        

        function hasNumbers(t)
            {
                var regex = /\d/g;
                return regex.test(t);
            }    
        
        function hasComma(t)
            {
                var regex = /[ ,]+/;
                return regex.test(t);
            }   
        function getCommaArray(t)
            {
                const greenArray = [...t];
                return greenArray;
            } 
        
        const image_url = require(`../assets/images/${this.props.college.image}`);
        return (
           <div className='card-container'>
               {this.props.college.promoted ? <Promoted/> : null}
               <div className='image-container'>
                    <div  className= 'image' style={{backgroundImage: `url(${image_url})`}}> 

                    </div>
                    <div className='rating'>      {/*Rating start*/}
                        <div>
                            <span style={{fontSize: "18.5px", fontFamily: "DINPro-Bold"}}>{this.props.college.rating}</span>/5 
                        </div>
                        <div>
                        {this.props.college.rating_remarks}
                        </div>
                    </div>       {/*Rating end*/}

                    <div className='image-footer'> {/*Image footer start*/}
                        {this.props.college.tags.map(tag => 
                                <div className='circular-box' key={tag}>
                                    {tag}
                                </div>
                        )}
                        <div className='spacer'> </div>
                        <div className='image-footer-text'>
                            {this.props.college.ranking}
                        </div>
                    </div> {/*Image footer end*/}
                    
                </div>
                <div className='content-container'>
                    <div className='left-content'>
                        <div className='header-container'> {/*header container start*/}
                            <div className='header'>
                                {this.props.college.college_name}
                            </div>
                            <div className='stars-container'>
                                {stars.map(star =>
                                <div className='star'>
                                </div>
                                )}
                                {emptyStars.map(emptyStar =>
                                <div className='star empty-star'>
                                </div>
                                )}
                                
                            </div>
                        </div> {/*header container end*/}
                        <div className='nearest-container'>
                            {this.props.college.nearest_place.map((place,i)=>
                                    <div className='nearest-place'>
                                        {i != 0 ? " " + "| "+ place: place }
                                    </div>
                            )}
                           
                        </div>
                        <div className='famous-nearest-places'>
                                <span style={{color: "#37b396", fontFamily: "DINPro-Bold"}}>
                                  93% Match : 
                                </span> 
                                {nearestPlacesArray.map( char =>
                                    hasNumbers(char) ? 
                                    <span style={{color: "#444444", fontFamily: "DINPro-Bold"}}>
                                        {char +'\xa0'}
                                    </span>: 
                                            hasComma(char) ? 
                                                getCommaArray(char).map(elem=>
                                                    elem == ',' ?
                                                    <span style={{color: "#37b396"}}>
                                                        {elem+'\xa0'}
                                                    </span>
                                                    :
                                                    <span>
                                                        {elem}
                                                    </span>)
                                                    :
                                                    <span >
                                                        {char +'\xa0'}
                                                    </span>
                                )}
                        </div>
                        <div className='offer-text-container'>
                            {offerTextArray.map( (char,i) =>
                                i == 0 ?
                                <span>
                                    {char +'\xa0'}
                                </span>:
                                    i == offerTextArray.length -2 ?
                                    <span style={{color: "#1999d2", fontFamily: "DINPro-Bold"}}>
                                    {char +'\xa0'}
                                    </span>:
                                    hasNumbers(char) ?
                                        <span style={{color: "#4bb89e", fontFamily: "DINPro-Bold"}}>
                                        {char +'\xa0'}
                                        </span>:
                                        <span style={{fontFamily: "DINPro-Bold"}}>
                                        {char +'\xa0'}
                                        </span>
                                    )}
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='discount-container'>
                                <div>
                                    {"₹" + this.props.college.original_fees}
                                </div>
                                <div className='discount-badge'> {/*discount-badge start*/}
                                    <div className='discount-triangle'>
                                    </div>
                                    <div className='discount-rectangle'>
                                        <div className='discount-circle'>
                                        </div>
                                        <div>
                                            {this.props.college.discount}
                                        </div>
                                    </div>
                                </div>  {/*discount-badge end*/}
                        </div>
                        <div className='discounted-price-container'>
                            <div className='discounted-price'>
                                {"₹" + this.props.college.discounted_fees}
                            </div>
                            <div className='fees-cycle'>
                                {this.props.college.fees_cycle}
                            </div>
                        </div>
                        <div className='amenties-container'>
                            {this.props.college.amenties.map( (char,i)=>
                                i == 0 ?
                                <div className='amenties'>
                                    {char +'\xa0'}
                                </div>:
                                <div className='amenties'>
                                    {'.' + '\xa0'+ char}
                                </div>
                                )}
                        </div>
                    </div>
               </div>
           </div>
           
        );
    }
};