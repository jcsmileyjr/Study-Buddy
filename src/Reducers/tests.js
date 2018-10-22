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
	{"question":"Father of genetics?","answer":"Gregor Mendel", "passFail":"asking"},
	{"question":"Why did Mendel use pea plants?","answer":"Pea plants reproduce quickly and he could control how they mate. They also produce a lot of offspring", "passFail":"asking"},
	{"question":"What characteristics of the pea plant did Mendel study?","answer":"lower color, flower position, seed color, seed shape, pod shape, pod color, and stem length", "passFail":"asking"},
	{"question":"Homozygous alleles?","answer":"Identical forms of the same gene", "passFail":"asking"},
	{"question":"Which law states that organisms inherit two copies of each gene and donate one copy to each of their offspring?","answer":"Law of segregation", "passFail":"asking"},
	{"question":"P1 generation?","answer":"Parental generation; both parents are pure for the trait", "passFail":"asking"},
	{"question":"F1 generation?","answer":"Offspring of the P generation; all the offspring are hybrid of the P generation", "passFail":"asking"},
	{"question":" F2 generation?","answer":"Offspring resulting from interbreeding of the hybrid F1 generation", "passFail":"asking"}, 
	{"question":"An alternative form of a gene?","answer":"Allele", "passFail":"asking"},
	{"question":"Which of Mendel's laws states that two or more pairs of alleles separate individually from one another?","answer":"Law of independent assortment", "passFail":"asking"},
	{"question":"A chart used to predict possible outcomes of allele combinations of an offspring could inherit?","answer":"Punnett Square", "passFail":"asking"},
	{"question":"Different forms of the same gene located on homologous chromosomes?","answer":"Heterozygous alleles", "passFail":"asking"},
	{"question":"A recessive allele is only expressed?","answer":"When two copies are present.", "passFail":"asking"},
	{"question":"For a female to be able to express a recessive-linked trait, she must have?","answer":"Both recessive alleles attached to her X chromosomes", "passFail":"asking"},
	{"question":"Examples of polygenic traits?","answer":"Skin color, height, eye color and hair color", "passFail":"asking"},
	{"question":"Does not have the disorder but can pass it to offspring?","answer":"Carrier of genetic disorder", "passFail":"asking"},
	{"question":"Why are sex-linked traits more common in males than in females?","answer":"Because males only have one X chromosome and the Y chromosome doesn't 'mask' alleles on the Y chromosome.", "passFail":"asking"},
	{"question":"How does blood type exhibit codominance?","answer":"The A allele isn't dominant over the B alleles and the B Allele isn't dominant over the A alleles which leads to the blood type AB.", "passFail":"asking"},
	{"question":"Females have what sex chromosomes?","answer":"XX", "passFail":"asking"},
	{"question":"Males have what sex chromosomes?","answer":"XY", "passFail":"asking"},
	{"question":"Which blood type is the universal donor?","answer":"Type O", "passFail":"asking"},
	{"question":"Which blood type is the universal recipient?","answer":"Type AB", "passFail":"asking"},
	{"question":"An organism's physical appearance, or visible traits?","answer":"Phenotype", "passFail":"asking"},
	{"question":"Trait controlled by two or more genes? ","answer":"Polygenetic Trait", "passFail":"asking"}, 
	{"question":"Traits controlled by genes located on sex chromosomes?","answer":"Sex-linked traits", "passFail":"asking"},
	{"question":"When both alleles are expressed equally and 'blend' to create a 3rd phenotype?","answer":"Incomplete dominance", "passFail":"asking"},
	{"question":"Neither allele for a particular trait is dominant over the other?","answer":"Codominance", "passFail":"asking"},
	{"question":"Examples of Codominance?","answer":"Blood Type AB, checkered chicken, Roan cattle.", "passFail":"asking"},
	{"question":"Examples of Incomplete Dominance?","answer":"Pink flower (Red + White = Pink).", "passFail":"asking"},
	{"question":"Examples of X-linked recessive disorders? ","answer":"color blindness, duchenne muscular dystrophy, hemophilia.", "passFail":"asking"},
	{"question":"Examples of polygenic traits?","answer":"Eye color, skin color, and height.", "passFail":"asking"},
	{"question":"Any chromosome that is not a sex chromosome; Chromosome pairs 1-22?","answer":"Autosomes", "passFail":"asking"}, 
	{"question":"Chromosomes that determine the sex of an individual; Chromosome pair #23?","answer":"sex chromosomes", "passFail":"asking"},
	{"question":"The crossing of an individual of unknown genotype with a homozygous recessive individual to determine the unknown genotype?","answer":"Test cross", "passFail":"asking"},
	{"question":"What is the expected genotype ratio resulting from a heterozygous crossed with a heterozygous? ","answer":"1:2:1", "passFail":"asking"},
	{"question":"Two parents have the genotype Gg for a genetic disorder caused by a dominant allele. What is the chance that any of their children will inherit the disorder?","answer":"75% (Be able to show your work)", "passFail":"asking"}
];