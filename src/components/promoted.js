import React, {Component} from 'react';
import './promoted.css';


export default class Promoted extends Component {
    render(){
        return (
               <div className='badge-container'>
                   <div className='triangle'>
                    </div>
                    <div className='rectangle'>
                        PROMOTED
                    </div>
               </div>
               )
        }
}