from array import array
def analyserInt(s):
	s = s + " "
	toAnalyse = ['i', 'n', 't'] #automate qui reconnait le mot int 
	reconnu = True
	thisIsIt = False
	i = 0
	w = ""
	for c in s: #parcours de la chaine en entrée
		if(c != ' '):
			w += c
		else:
			for ch in w:
				if(toAnalyse[i] == ch and reconnu):
					reconnu = True
					if(i == len(toAnalyse)-1): #Etat final
						thisIsIt = True
					else:
						thisIsIt = False
					
				else:
					reconnu = False
					thisIsIt = False
				i = (i+1)%len(toAnalyse)	#Comme si on a fait 
				if(i == 0):	# if(i == len(toAnalyse)) mais sans que ca genere une erreur dans la ligne if(toAnalyse[i] == ch and reconnu):
					reconnu = False
			
			if(thisIsIt):
				print("mot: "+ w + " Type: entier")
			w = ""
			reconnu = True
			thisIsIt = False
			i = 0

def analyserArth(s):
	s = s + " "
	toAnalyse = ['+', '-', '*', '/'] #automate qui reconnait les operateurs
	w = ""
	for c in s: #parcours de la chaine en entrée
		if(c != ' '):
			w += c
		else:
			if(len(w) == 1):
				for op in toAnalyse:
					if(w == op):
						print("mot: "+ w + " Type: operateur")
			w = ""

def analyserComp(s):
	s = s + " " 
	toAnalyse = ['<', '='] #automate qui reconnait les comparateurs 
	w = ""
	for c in s: #parcours de la chaine en entrée
		if(c != ' '):
			w += c
		else:
			if(len(w) == 1):
				for cm in toAnalyse:
					if(w == cm):
						print("mot: "+ w + " Type: comparateur")
			w = ""

def analyserLogique(s):
	s = s + " "
	toAnalyse = ['&', '|', '!'] #automate qui reconnait les operateurs logique 
	w = ""
	for c in s: #parcours de la chaine en entrée
		if(c != ' '):
			w += c
		else:
			if(len(w) == 1):
				for log in toAnalyse:
					if(w == log):
						print("mot: "+ w + " Type: operateur logique")
			w = ""

def analyserInsVide(s):
	s = s + " "
	toAnalyse = [';'] #automate qui reconnait un instruction vide
	w = ""
	for c in s: #parcours de la chaine en entrée
		if(c != ' '):
			w += c
		else:
			if(len(w) == 1):
				for log in toAnalyse:
					if(w == log):
						print("mot: "+ w + " Type: instruction vide")
			w = ""

def analyserinsBloc(s):
	s = s + " "
	begin = '{'
	end = '}'
	i = 0
	j = 0
	w = ""
	k = 1
	indiceBegin= []
	indiceEnd = []
	for c in s: #parcours de la chaine en entrée
		if(c != ' '):
			w += c
		else:
			if(len(w) == 1):
				if(w == begin):
					i+=1
					indiceBegin.append(j)
				if(w == end and i>0):
					i-=1
					indiceEnd.append(j)
			w = ""
		j+=1
	for indB in indiceBegin:
		print("mot: "+ s[indB:indiceEnd[len(indiceEnd)-k]-1] + " Type: bloc d'instruction")
		k+=1
def analyserif(s):
	s = s + " "
	begin = ['i', 'f'] #automate qui reconnait le mot if
	then = ['t', 'h', 'e', 'n'] #automate qui reconnait le mot then
	i = 0
	j = 0
	reconnuIf = True
	ifFlag = False

	reconnuThen = True
	thenFlag = False

	reconnuIf = True
	ifFlag = False
	w = ""
	k = 1 
	for c in s: #parcours de la chaine en entrée
		if(c != ' '):
			w += c
		else:
			for ch in w:
				if(begin[i] == ch and reconnuIf):
					reconnuIf = True
					if(i == len(begin)-1): #Etat final
						ifFlag = True
				else:
					reconnuIf = False
				if(then[j] == ch and reconnuThen):
					reconnuThen = True
					if(j == len(then)-1): #Etat final
						thenFlag = True
					else:
						thenFlag = False

				else:
					reconnuThen = False
					thenFlag = False
				i = (i+1)%len(begin)	#Comme si on a fait 
				if(i == 0):	# if(i == len(toAnalyse)) mais sans que ca genere une erreur dans la ligne if(toAnalyse[i] == ch and reconnu):
					reconnuIf = False

				j = (j+1)%len(then)	#Comme si on a fait 
				if(j == 0):	# if(i == len(toAnalyse)) mais sans que ca genere une erreur dans la ligne if(toAnalyse[i] == ch and reconnu):
					reconnuThen = False

			if(ifFlag and thenFlag):
				print("Bloc if")
			w = ""
			reconnuIf = True
			reconnuThen = True
			thenFlag = False
			i=0
			j=0

def analyserwhile(s):
	s = s + " "
	begin = ['w', 'h', 'i', 'l', 'e'] #automate qui reconnait le mot while
	then = ['d', 'o'] #automate qui reconnait le mot do
	i = 0
	j = 0
	reconnuIf = True
	ifFlag = False

	reconnuThen = True
	thenFlag = False

	reconnuIf = True
	ifFlag = False
	w = ""
	k = 1
	for c in s:
		if(c != ' '):
			w += c
		else:
			for ch in w:
				if(begin[i] == ch and reconnuIf):
					reconnuIf = True
					if(i == len(begin)-1): #Etat final
						ifFlag = True
				else:
					reconnuIf = False
				if(then[j] == ch and reconnuThen):
					reconnuThen = True
					if(j == len(then)-1): #Etat final
						thenFlag = True
					else:
						thenFlag = False

				else:
					reconnuThen = False
					thenFlag = False
				i = (i+1)%len(begin)	#Comme si on a fait 
				if(i == 0):	# if(i == len(toAnalyse)) mais sans que ca genere une erreur dans la ligne if(toAnalyse[i] == ch and reconnu):
					reconnuIf = False

				j = (j+1)%len(then)	#Comme si on a fait 
				if(j == 0):	# if(i == len(toAnalyse)) mais sans que ca genere une erreur dans la ligne if(toAnalyse[i] == ch and reconnu):
					reconnuThen = False

			if(ifFlag and thenFlag):
				print("Bloc while")
			w = ""
			reconnuIf = True
			reconnuThen = True
			thenFlag = False
			i=0
			j=0
var = raw_input("Chaine a analyser: ")
analyserInt(var)
analyserArth(var)
analyserComp(var)
analyserLogique(var)
analyserInsVide(var)
analyserinsBloc(var)
analyserif(var)
analyserwhile(var)