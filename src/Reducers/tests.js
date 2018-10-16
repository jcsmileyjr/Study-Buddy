//reducer that holds the arrayOfAnswers as the initial state of questions and answers.
export default function test(state=arrayOfAnswers, {type, payload}){
	switch(type){
		case 'UPDATEANSWERPASSFAIL':
			return payload;//When a user chosen a new answer, the state is updated with it.
		default:
			return state;
	}
}

const arrayOfAnswers = [
	{"question":"Scientific study of heredity","answer":"Genetics", "passFail":"asking"},
	{"question":"Specific characteristic of an individual","answer":"Trait", "passFail":"asking"},
	{"question":"Offspring of crosses between parents with different traits","answer":"Hybrid", "passFail":"asking"},
	{"question":"Sequence of DNA that codesfor a protein and that determines a trait; factors that are pased from parent to offspring","answer":"Genes", "passFail":"asking"},
	{"question":"One of different forms of a gene","answer":"Alleles", "passFail":"asking"},
	{"question":"Having two identical alleles for a particular gene","answer":"Homozygous", "passFail":"asking"},
	{"question":"Having two different alleles for a particular gene","answer":"Heterozygous", "passFail":"asking"},
	{"question":"Physical characteristics of an organism","answer":"Phenotype", "passFail":"asking"},
	{"question":"Genetic makeup of an organism","answer":"Genotype", "passFail":"asking"},
	{"question":"Diagram that can be used to predict the genotype and phenotype combination of a genetic across","answer":"Punnett Square", "passFail":"asking"}    
];