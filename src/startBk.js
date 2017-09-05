import React from 'react';
import ReactDOM from 'react-dom';
import Axios  from 'axios';

// need to know if the user is regirest
alert(location.pathname)

let comp;
if (location.pathname == '/welcome') {
    comp = <Welcome />
} else {
    comp = <Logo />
}
// than render comp in the ReactDOM.render()





// Functional component
// function Hello() {
//
//     let rand = Math.floor(Math.random() * 10);
//
//     return (
//         <div>
//             <div>Hello, <Emphasize word='world' />!</div>
//             {rand <5 && 'yes!'}
//             <input id='name-changer' />
//             <ul>
//                 {['world', 'kitty', 'discoduck'].map(el => <li><NiceToSeeYou word={el}/></li>)}
//             </ul>
//         </div>
//     );
// }

class Hello extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            word : 'kitty'
        };
    }

    changeWord(e) {
        this.setState({
            word: e.target.value
        });
    }

    render() {
        let rand = Math.floor(Math.random() * 10);
        return (
            <div>
                <div>Hello, <Emphasize word={this.state.word} />!</div>
                {rand <5 && 'yes!'}<br/>
                <NameChanger changeName={e => this.changeWord(e)}/>
                <ul>
                    {['world', 'kitty', 'discoduck'].map(el => <li><NiceToSeeYou word={el}/></li>)}
                </ul>
            </div>
        );
    }
}


function NameChanger(props) {
    return (
        <input id='name-changer' onChange={e => props.changeName(e)}/>

    )
}



ReactDOM.render(
    <Hello />,
    document.querySelector('main')
);











function NiceToSeeYou(props) {
    return (
        <li>
            It s nice to see you, <Emphasize word={props.word} />
        </li>
    )
}

function Emphasize({word}) {
    return (
        <span className='emph' style={{
            fontWeight: 'bold',
            fontStile: 'italic',
            textDecoration: 'underline',
            color: 'red'
        }}>{word}</span>
    )
}
