from array import array
grammaire = [
				["<programme>", "main(){ <liste_declarations> <liste_instructions> }"],
				["<liste_declarations>", "<une_declaration> <liste_declarations>", ""],
				["<une_declaration>", "<type> id"],
				["<type>", "int", "float"],
				["<liste_instructions>", "<une_instruction> <liste_instructions>", ""],
				["<une_instruction>", "<E/S>", "<affectation>", "<test>"],
				["<E/S>", "<saisie>", "<affichage>"],
				["<saisie>", "cin>>id;"],
				["<affichage>", "cout<<id;"],
				["<affectation>", "id=nombre;"],
				["<test>", "if <condition> <instruction> else <instruction>"],
				["<condition>", "id <operateur> nombre"],
				["<operateur>", "<", ">", "<=", ">=", "=", "!="]
			]
#Intialisation de la Matrice de la Grammaire

table_analyse = [
					["main(){", "}", "id", "int", "float", "cin>>id;", "cout<<id;", "id=nombre;", "if", "else", "nombre", "<", ">", "<=", ">=", "=", "!=", "$"],
					[grammaire[0][1], None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None],
					[None, None, None, grammaire[1][1], grammaire[1][1], grammaire[1][2], grammaire[1][2], grammaire[1][2], grammaire[1][2], None, None, None, None, None, None, None, None, grammaire[1][2]],
					[None, None, None, grammaire[2][1], grammaire[2][1], None, None, None, None, None, None, None, None, None, None, None, None, None],
					[None, None, None, grammaire[3][1], grammaire[3][2], None, None, None, None, None, None, None, None, None, None, None, None, None],
					[None, grammaire[4][2], None, None, None, grammaire[4][1], grammaire[4][1], grammaire[4][1], grammaire[4][1], None, None, None, None, None, None, None, None, grammaire[4][2]],
					[None, None, None, None, None, grammaire[5][1], grammaire[5][1], grammaire[5][2], grammaire[5][3], None, None, None, None, None, None, None, None, None],
					[None, None, None, None, None, grammaire[6][1], grammaire[6][2], None, None, None, None, None, None, None, None, None, None, None],
					[None, None, None, None, None, grammaire[7][1], None, None, None, None, None, None, None, None, None, None, None, None],
					[None, None, None, None, None, None, grammaire[8][1], None, None, None, None, None, None, None, None, None, None, None],
					[None, None, None, None, None, None, None, grammaire[9][1], None, None, None, None, None, None, None, None, None, None],
					[None, None, None, None, None, None, None, None, grammaire[10][1], None, None, None, None, None, None, None, None, None],
					[None, None, grammaire[11][1], None, None, None, None, None, None, None, None, None, None, None, None, None, None, None],
					[None, None, None, None, None, None, None, None, None, None, None, grammaire[12][1], grammaire[12][1], grammaire[12][1], grammaire[12][1], grammaire[12][1], grammaire[12][1], None],

				]
#Intialisation de la Table d'Analyse

pile = ["$"] #Insialisation de la pile

#fonction qui verfie si le symbole courant est terminal ou pas
def estNonTerminal(x):
	for a in table_analyse[0]:  #parcours de la table d'analyse
		if(a == x):
			return False

	return True

#fonction qui retourne la régle d'un symbole non-terminal
def getRegle(x, a): 
	indiceC = -1
	indiceL = 1


	indiceC = table_analyse[0].index(a) #On recupére l'indice du symbole terminal

#On recupére la régle du symbole terminal
	for g in grammaire:
		if(g[0] == x):
			break
		indiceL+=1

	return table_analyse[indiceL][indiceC]

#fonction qui empile les règles à la pile
def empiler(regle):
	global pile
	r = regle.split()
	r.reverse()
	pile.extend(r)

entree = raw_input("Chaine a analyser: ")

#on ajout $ pour symboliser la fin de la chaine
entree += " $"
ent = entree.split() 


flag = True 
empiler(grammaire[0][1]) #On insialise la pile à l'axiome

a = ent.pop(0) 
while flag: 
	x = pile[-1] 

	if(estNonTerminal(x)):  #si le symbole en sommet de pile est non terminal
		regle = getRegle(x, a) #on retourne la regle
		if(regle is not None):
			pile.pop() #on depile x de la pile
			empiler(regle) #on empile la regle
			print regle #on emet la regle
		else:
			print "Erreur: Regle n'existe pas \n"
			flag = False
	else:
		if(x == "$"): #Si on a attient le fond de la pile et le symbole courant represente la fin de la chaine $ donc la chaine est acceptée
			if(a == "$"):
				print "Chaine acceptee \n"
				flag= False
			else:
				print "Erreur: Chaine n'est pas reconnu \n"
				flag = False
		else:
			if(a == x): #si le sommet de pile est un symbole terminal
				pile.pop() #on depile x
				a = ent.pop(0) #et on passe au symbole suivant
			else:
				print "Erreur !\n" #si la chaine n'est pas acceptée
				flag = False