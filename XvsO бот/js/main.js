const qs = ((dqs) => {return document.querySelector(dqs)})
dqs = ((a,i) =>{return document.querySelector((`#${a}${i}`)).value})
alertGame = qs('.alert'),XWins = qs('#xWins'),OWins = qs('#oWins'),gTurn = qs('#turn'),setBot = qs('#set_bot'),set2p = qs('#set_2players'),box = document.querySelectorAll('.box')
let turn = 'x', step = 0, xWins = 0, oWins = 0,endGame = false,isBot = true

setBot.onclick =(() =>{alertGame.innerHTML = `<p> играть с ботом</p>`;isBot = true;wipe()})
set2p.onclick =(() =>{alertGame.innerHTML = `<p> играть с другом!</p>`;isBot = false;wipe()})
	
function wipe(){//очищает игроваое поле
	alertGame.classList.add('visible')
	setTimeout(() => {
		for (var i = 0; i < box.length; i++) {
			box[i].value = ''
		}
		step = 0
		endGame = false
		if (isBot) {update(), turn == '0'?step++:step = 0}
		alertGame.classList.remove('visible')
	},2000);
}

function full(){//проверка заполнено ли поле
	fullQoof = 0
	for (var i = 0; i < box.length; i++) {
		box[i].value != ''?fullQoof++:fullQoof = 0
	}
	fullQoof > 8?winn('Никто не '):fullQoof = 0
}

function winn(a){ //вывод статистики побед и кто победил в раунде
	endGame = true
	alertGame.innerHTML = `<p> ${a} выигал!</p>`
	a == 'X'?(xWins++ ,XWins.innerHTML = xWins, turn = 'o'):a == 'O'?(oWins++ ,OWins.innerHTML = oWins,  turn = 'x'):wipe()
	wipe()
}

function GetRandom(min,max){return Math.round(Math.random() * (max - min) + min)}

function botStep(i,thisId){ //мозги бота
	let botTurn = GetRandom(0,8)
		for (var j = 0; j < 3; j++) {
			let x = j*3
			let col = 0 + x // 0 3 6
			let row = 0 + j // 0 1 2

			if (box[col].value + box[(col + 1)].value + box[(col + 2)].value == 'XX' ) {
				for (var p = 0; p < 3; p++) {
					box[(col + p)].value == ''?box[(col + p)].value = 'O':isBot = true
				}
				turn = 'x'
				break
			}
			else if (box[row].value + box[(row + 3)].value + box[(row + 6)].value == 'XX') {
				for (var p = 0; p < 3; p++) {
					box[(row + p*3)].value == ''?box[(row + p*3)].value = 'O':isBot = true
				}
				turn = 'x'
				break
			}
			else if (box[0].value + box[4].value + box[8].value == 'XX') {
				for (var p = 0; p < 3; p++) {
					box[(p*4)].value == ''?box[(p*4)].value = 'O':isBot = true
				}
				turn = 'x'
				break
			}
			else if (box[2].value + box[4].value + box[6].value == 'XX') {
				for (var p = 1; p < 4; p++) {
					box[(p*2)].value == ''?box[(p*2)].value = 'O':isBot = true
				}
				turn = 'x'
				break
			}
			else if (dqs('a',1) + dqs('b',2) + dqs('c',3) === 'XX') {
				for (var i = 1; i < 4; i++) {
					i == 2?d='b':i != 1?d='c':d = 'a'
					dqs('a',i) == ''
					botTurn = dqs('a',i)
				}
			}
			else if (j == 2){
				if (botTurn != i && box[botTurn].value == '') {
					turn = 'x'
					box[botTurn].value = 'O'
				}
				else if(step < 9){ botStep() }
				break
			}				
		}
	turn = 'x'
	step++
	update()
}

function botTurn(){ //задержка бота (типо думает как походить)
	if (turn == 'o' && !endGame && isBot == true) {
		setTimeout(() => {
			botStep()
		},700);
	}
}

function update(){ //проверка есть ли выиграшные комбинации на поле
	for (var i = 1; i < 4; i++) {
		i == 2?d='b':i != 1?d='c':d = 'a'
		if (dqs(d,1) + dqs(d,2) + dqs(d,3) === 'XXX' || dqs('a',i) + dqs('b',i) + dqs('c',i) === 'XXX') {
			winn('X')
		}
		else if (dqs('a',3) + dqs('b',2) + dqs('c',1) === 'XXX'|| dqs('a',1) + dqs('b',2) + dqs('c',3) === 'XXX') {
			winn('X')
			break
		}
		else if (dqs(d,1) + dqs(d,2) + dqs(d,3) === 'OOO' || dqs('a',i) + dqs('b',i) + dqs('c',i) === 'OOO') {
			winn('O')
		}
		else if (dqs('a',3) + dqs('b',2) + dqs('c',1) === 'OOO'|| dqs('a',1) + dqs('b',2) + dqs('c',3) === 'OOO') {
			winn('O')
			break
		}
		else{
			full()
		}
	}
	gTurn.innerHTML = turn
}	

setInterval(botTurn, 1000) // проверяет походил ли бот

for (var i = 0; i < box.length; i++) { //ход игрока/игроков
	box[i].onclick = function(){
		if (turn == 'x') {
			this.value != ''?turn = 'x':(this.value = 'X',turn = 'o',  step++)
		}
		if( isBot == false && turn == 'o'){
			this.value != ''?turn = 'o':(this.value = 'O',turn = 'x',  step++)
		}
		update()
	}
}