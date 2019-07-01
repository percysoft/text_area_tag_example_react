import React, { Component } from 'react';

import { DraggableArea } from 'react-draggable-tags';
import './style.css';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueTextArea: '',
      valueNew:'dsaadssadas',
      objectValue : []
    };
  }
  componentDidMount() {
    console.log('MOunt')
  }
  componentDidUpdate() {
    console.log('udapte');
  }
  render() {
    const insertHtmlAtCursor =(html) =>{
      var range, node;
      if (window.getSelection && window.getSelection().getRangeAt) {
        range = window.getSelection().getRangeAt(0);
        node = range.createContextualFragment(html);
        range.insertNode(node);
      } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().pasteHTML(html);
      }
    }
    const initialTags = [
      { id: 1, content: 'apple' }, { id: 2, content: 'undraggable', undraggable: true }, { id: 3, content: 'banana' },
      { id: 4, content: 'lemon' }, { id: 5, content: 'orange' }, { id: 6, content: 'grape' },
      { id: 7, content: 'strawberry' }, { id: 8, content: 'cherry' }, { id: 9, content: 'peach' }];

    const getValueSelect = (e) =>  {
      console.log(e.target.textContent, '<---');
      this.setState({
        valueTextArea: this.state.valueTextArea + ' ' + e.target.textContent
      }, () => {
          // insertHtmlAtCursor(e.target.textContent);
      })
      let textLarge = document.getElementById('texareaValueNew').innerText;
      this.setState({
        valueNew: textLarge + e.target.textContent
      }, () => {

          convertText();
          // constinsertHtmlAtCursor(e.target.textContent);
      });

    }
     const handleChange = (event) => {
      this.setState({
        valueTextArea: event.target.value
      });
    }
    const handleChangeNew = (event) => {
      console.log(event.target.value,'<????')
      console.log(document.getElementById("texareaValueNew").innerText, 'innertext');
      this.setState({
        valueNew: document.getElementById("texareaValueNew").innerText
      });
      // this.setState({
      //   valueNew: event.target.textContent
      // });
    }
    const convertText = () => {
      let newValue = (this.state.valueNew).split(" ");
      let newObject = []
      for (let i = 0; i < newValue.length; i++) {
        newObject.push({
          value: newValue[i],
          isTag: false,
        })
      }
     
      console.log(newValue,'newValue');
      for (let i = 0; i < newValue.length; i++){
        let conNo = 0;
        initialTags.map((item) => {
          let conYes = 0;
          if(newValue[i] === item.content) {
            conYes = conYes +1;
            newObject.map((item) => {
              if (newValue[i] === item.value){
                item.isTag = true;
              }
            })
          } else {
            conNo = conNo +1
          }
          console.log(conYes,'conYes');
        })
        // if(conNo > 0) {
        //   newObject.push({
        //     value: newValue[i],
        //     isTag: false,
        //   })
        // }
        
      }
      this.setState({
        objectValue: newObject
      })
      console.log(newObject,'newObject')
    }
    const handleFocus = (event) => event.target.select();

    return (
      <div className="Simple">
        <div
        id="texareaValueNew" 
        contenteditable="true"
          onInput={(e) => handleChangeNew(e)}
        onChange={handleChangeNew}
        >
          {/* {this.state.valueNew} */}
          {this.state.objectValue.map((item) => {
            return(
              <React.Fragment>
                {
                item.isTag ?
                    <React.Fragment>
                    <label className={'border_input'}> {item.value} 
                    </label>
                    <label> a </label>
                    </React.Fragment>

                  :
                    <React.Fragment>
                      <label>{item.value}</label>
                    <label> a </label>
                    </React.Fragment>

                }
            
              </React.Fragment>
            )
          })}
        </div> 
        <textarea
          type="text"
          onChange={handleChange}
          value={this.state.valueTextArea}
          rows="10"
          cols="55"
        />
        <input onFocus={(evt) => handleFocus(evt)} value=" Sample " className="text_select" readonly="readonly"/>
        <input onFocus={(evt) => handleFocus(evt)} value=" Sample " />
        <input onFocus={(evt) => handleFocus(evt)} value=" Sample " />
        <input onFocus={(evt) => handleFocus(evt)} value=" Sample " />
        <input onFocus={(evt) => handleFocus(evt)} value=" Sample " />
        <input onFocus={(evt) => handleFocus(evt)} value=" Sample " />
        <DraggableArea
          tags={initialTags}
          render={({ tag, index }) => (
            <p
            id="valueTextArea"
            onClick={(e) => getValueSelect(e)} 
            className={`tag ${tag.undraggable ? 'undraggable' : ''}`}
              value={` ${tag.content} `}>
              {tag.content}
            </p>
          )}
          // onChange={tags => console.log(tags)}
          // onChange={(e) => getValueSelect(e)}
        />
        <div>
          {this.state.valueNew}
        </div>
      </div>
    );
  }
}