##############################################################################
#       @author Caleb Farris
#       ticTacToe.py
#       
#       Simulates a game of tic-tac-toe
##############################################################################
from random import random
import re

##############################################################################
#                                FUNCTIONS
##############################################################################
#-----------------------------------------------------------------------------
#                               get_player_row
#
#       Returns the row that the player selects from the console prompt
#       @Params - who:  the current player
#       @Return - Integer:  the row selection
#-----------------------------------------------------------------------------
def get_player_row(who):
	user_input = ''
	#uses regular expression to only match 0-2
	while not re.match("^[0-2]{1}$", user_input):
		user_input = input("{} which row would you like? (0, 1, or 2) ".format(who))

	#even though this input "should" be a number between 0-2, use try anyway
	try: 
		user_input = int(user_input)
	except ValueError:
		print("You somehow entered an inappropriate value")
	
	return user_input

#-----------------------------------------------------------------------------
#                               get_player_col
#
#       Returns the column that the player selects from the console prompt
#       @Params - who:  the current player
#       @Return - Integer:  the column selection
#-----------------------------------------------------------------------------
def get_player_col(who):
	user_input = ''
	#only matches 0-2 with regular expression
	while not re.match("^[0-2]{1}$", user_input):
		user_input = input("{} which col would you like? (0, 1, or 2) ".format(who))

	#even though this input "should" be a number between 0-2, use try anyway
	try: 
		user_input = int(user_input)
	except ValueError:
		print("You somehow entered an inappropriate value")

	return user_input

#-----------------------------------------------------------------------------
#                               get_player_num
#
#       Returns the number representation of the player
#       @Params - who:  the current player, represented as a character
#       @Return - Integer:  the number that represents the character
#-----------------------------------------------------------------------------
def get_player_num(who):
	if who == "x":
		return 0
	else:
		return 1

#-----------------------------------------------------------------------------
#                               player_move
#
#       Checks to make sure move is valid.  If so, it adds the player's 
#       position to the game board and returns true.  
#       Returns false if invalid or the position is already taken.
#       @Params - row, col:  the positions
#       		- board:     the game booard
#       @Return - Boolean
#-----------------------------------------------------------------------------
def player_move(row, col, board, who):
	if row >= 0 and row < 3 and col >= 0 and col < 3:
		if board[row][col] == " ":
			board[row][col] = who
			return True
		elif board[row][col] == "x" or board[row][col] == "o":
			print("Position already taken.  Please choose another.")
			return False
	else:
		print("Invalid position.  Please choose a valid position.")
		return False

#-----------------------------------------------------------------------------
#                               change_turn
#
#       Simply changes the turn to the other player
#       @Params - who:  the current player
#       @Return - Integer, representing the turn of the now current player
#-----------------------------------------------------------------------------
def change_turn(who):
	if who == 0:
		return 1
	else:
		return 0

#-----------------------------------------------------------------------------
#                               change_player
#
#       Changes to other player's letter
#       @Params - who:  the current turn's player
#       @Return - Character:  the now current player
#-----------------------------------------------------------------------------
def change_current(who):
	if who == 0:
		return "o"
	else:
		return "x"

#-----------------------------------------------------------------------------
#                               draw_board
#
#       Draws the board, as well as helps visualize the game board
#       @Params - board:  the game board
#       @Return - Void:  prints the board
#-----------------------------------------------------------------------------
def draw_board(board):
	print("""  
		  |0 |1 |2  
		-----------
		0 |""" + board[0][0] + " |" + board[0][1] + " |" + board[0][2] + """
		-----------
		1 |""" + board[1][0] + " |" + board[1][1] + " |" + board[1][2] + """
		-----------
		2 |""" + board[2][0] + " |" + board[2][1] + " |" + board[2][2])

#-----------------------------------------------------------------------------
#                               check_winner
#
#       Checks the board to see if there is a winner.
#       @Params - board:  the game booard
#               - who:    the player (as "x" or "o")
#       @Return - Boolean:  whether the player has won or not
#-----------------------------------------------------------------------------
def check_winner(board, who):
	winner = False
	for i in range(0, 3):
		if board[i] == [who, who, who]:
			winner = True

	if board[0][0] == who and board[1][0] == who and board[2][0] == who:
		winner = True
	elif board[0][1] == who and board[1][1] == who and board[2][1] == who:
		winner = True
	elif board[0][2] == who and board[1][2] == who and board[2][2] == who:
		winner = True
	elif board[0][0] == who and board[1][1] == who and board[2][2] == who:
		winner = True
	elif board[0][2] == who and board[1][1] == who and board[2][0] == who:
		winner = True

	return winner

#-----------------------------------------------------------------------------
#                               check_tie
#
#       Checks the board to see if there is a tie.
#       @Params - board:  the game booard.
#       @Return - Boolean:  whether a tie has occured or not.
#-----------------------------------------------------------------------------
def check_tie(board):
	for row in board:
		for pos in row:
			if pos == "x" or pos == "o":
				continue
			else:
				return False

	return True

#-----------------------------------------------------------------------------
#                               check_conditions
#
#       Checks the game for the previous conditions of first a win, then a tie
#       @Params - board:  the game booard.
#       		- who:    the player (as "x" or "o")
#       @Return - Boolean:  Will return FALSE to stop game_in_session
#-----------------------------------------------------------------------------
def check_conditions(board, current, turn):
	if check_winner(board, current):
		draw_board(board)
		print("The winner is {}!".format(players[turn]))
		return False
	elif check_tie(board):
		draw_board(board)
		print("Tie!  Game over!")
		return False

	return True

#-----------------------------------------------------------------------------
#                               cointoss
#
#       Used to decide who will go first in the game
#       @Return - Character:  the letter of the starting player
#-----------------------------------------------------------------------------
def cointoss():
	rand = random()
	if rand < 0.50:
		return "x"
	else:
		return "o"

##############################################################################
#                                MAIN SECTION
##############################################################################
#-----------------------------------------------------------------------------
#                                 GAME SETUP                               
#-----------------------------------------------------------------------------
game_in_session = True
players = []
current = None
board = [[" ", " ", " "],
		 [" ", " ", " "],
		 [" ", " ", " "]
		 ]

players.append(input("Please enter your name:  "))
players.append(input("Please enter name of opponent:  "))

current = cointoss()
turn = get_player_num(current)
print("{} will go first.  You will be {} \n".format(players[turn], current))

#-----------------------------------------------------------------------------
#                               GAME LOOP
#-----------------------------------------------------------------------------
while game_in_session:
	draw_board(board)
	print("Player:  {}\n".format(current))
	row = get_player_row(players[turn])
	col = get_player_col(players[turn])

	#Returns to beginning of game loop if space occupied/invalid move
	if player_move(row, col, board, current) == False:
		continue

	game_in_session = check_conditions(board, current, turn)
	current = change_current(turn)
	turn = change_turn(turn)