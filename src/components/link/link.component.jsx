import React from "react";
import { Button, Form } from "react-bootstrap";
import { IconSVG } from "../icon-svg";
import "./link.styles.scss";


export default class LinkCustom extends React.Component {

  handleChangeLink(event) {
    let { dataObj } = this.props
    let fieldName = event.target.value ? event.target.value : '';
    let fieldURL = dataObj.url;
    dataObj = { name: fieldName, url: fieldURL }
    this.updateParentState(dataObj)
  }

  handleChangeURL(event) {
    let { dataObj } = this.props
    let fieldName = this.props.dataObj.name;
    let fieldURL = event.target.value ? event.target.value : '';
    dataObj = { name: fieldName, url: fieldURL }
    this.updateParentState(dataObj)
  }

  updateParentState(object) {
    let index = this.props.index
    this.props.onChangeData(object, index)
  }

  render() {
    const { index, deleteLink, dataObj } = this.props
    return (
      <div className="link__wrapper">
        <div className="link">
          <div className="link__delete" onClick={() => { deleteLink() }}><IconSVG name="trash"></IconSVG></div>
          <span className="link__title">Link {index}</span>
          <div className="link__list"><IconSVG name="list"></IconSVG></div>
        </div>
        <div>
          <Form.Group>
            <Form.Control type="text" className="link-text" value={dataObj ? dataObj.name : null} onChange={this.handleChangeLink.bind(this)} placeholder="Link Name (optional)" />
            <Form.Control type="text" className="link-text" value={dataObj ? dataObj.url : null} onChange={this.handleChangeURL.bind(this)} placeholder="URL" />
          </Form.Group>
        </div>
      </div>
    )
  }
}
