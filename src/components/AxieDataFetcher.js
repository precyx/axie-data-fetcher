import React, { Component } from 'react';
import styled from 'styled-components';
// axios
import axios from "axios";
// BigNumber
import BigNumber from "bignumber.js";
// own
import Button from "./ui/Button";
import Textfield from "./ui/Textfield";
import {buildAxieByIdAPI} from "../services/axie-data-service";
import {gene_map} from "../data/gene-data";

//CSS
const StyledAxieDataFetcher = styled.div`
	.interface1 {margin-top:40px;}
	h1 {margin-bottom:10px;}

	.output {margin-top:40px;}
	.output .title {font-size: 14px; margin-bottom: 10px; color: #5d5d5d;}
	.output .textbox {border:1px solid #d2d2d2; padding:20px; font-size:12px; color:grey; overflow:scroll;}
	.output .all_data {height:150px; width:200px; }
	.output .genes {height:350px; width:100%; display: flex; flex-flow: wrap;}

	.output .axie {display:flex; }
	.output .axie .id { width:100px; }

	.box {margin-bottom:20px;}
`;

class AxieDataFetcher extends Component {
	constructor(props) {
		super(props);
		this.state = {
			axies: [],
			output: ""
		}
	}

	fetchData = () => {
		var url;
		var startId = 5;
		var num = 100;
		//
		for(let i=startId; i<startId+num; i++){
			url = buildAxieByIdAPI(i);
			axios.get(url).then(data=>{
				var newAxie = data.data;
				newAxie["genesBinary"] = this.getPaddedGeneBinary(newAxie);
				newAxie["all_genes"] = this.getGenesFromGenome(newAxie);
				this.setState((prevState) => ({
					axies: [...prevState.axies, data.data],
					output: JSON.stringify([...prevState.axies, newAxie["all_genes"]])
				}));
				
			});
		}
	}


	getPaddedGeneBinary(axie){
		return new BigNumber(axie.genes).toString(2).padStart(256, 0); 
	}

	/**
	 * Splits all genes from the genome string
	 * Needs to be binary and padded to 256 bits to work correctly
	 * @param {*} axie
	 * @memberof AxieDataFetcher
	 */
	getGenesFromGenome(axie){
		var genes = {};
		var genesBinary = axie.genesBinary;
		gene_map.forEach(geneData=>{
			genes[geneData.id] = genesBinary.substring(0, geneData.bits);
			genesBinary = genesBinary.substring(geneData.bits, geneData.length);
		});
		console.log(axie.id, genes);
		return genes;
	}


	


	render() {
		var genes = "";
		if(this.state.axies){
			genes = this.state.axies.map((axie)=>
				<div key={axie.id} className="axie">
					<div className="id">#{axie.id}</div>
					<div>
						<div>{axie.genes}</div>
						<div>{axie.genesBinary}</div>
					</div>
				</div>
			)
		}
		console.log(genes);
		return (
			<StyledAxieDataFetcher>
				<div className="interface1">
					<h1>Axie Data Fetcher</h1>
					<Textfield name="start" />
					<Button onClick={this.fetchData} name="Fetch Data"/>
				</div>
				<div className="output">
					<div className="box">
						<div className="title">Data Output</div>
						<textarea className="textbox all_data" value={this.state.output} readOnly></textarea>
					</div>
					<div className="box">
						<div className="title">Genes</div>
						<div className="textbox genes">
							{genes}
						</div>
					</div>
				</div>
			</StyledAxieDataFetcher>
		);
	}
}


export default AxieDataFetcher;