'use client';
import Confetti from "react-confetti";
import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type confettiProps = {
  width: number;
  height: number;
}

const confettiColors = ['#A2D9A3', '#1D8348', '#F9E79F', '#F4D03F', '#FFFFFF', '#F1C40F'];
// const confettiColors = ['#2C3E50', '#34495E', '#8E44AD', '#D35400', '#C0392B', '#7F8C8D', '#16A085'];

// interface NumberGuessingState {
//     gameStarted: boolean;
//     gameOver: boolean;
//     paused: boolean;
//     targetNumber: number;
//     userGuess: number | string;
//     attempts: number;
// }

export default function NumberGuessing(): JSX.Element {
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [paused, setPaused] = useState<boolean>(false);
    const [targetNumber, setTargetNumber] = useState<number>(0);
    const [userGuess, setUserGuess] = useState<number | string>("");
    const [attempts, setAttempts] = useState<number>(0);
    const [windowSize, setWindowSize] = useState<confettiProps>({width: 0, height: 0});


    useEffect(() => {
      const handleResize = () => {
          setWindowSize({width: window.innerWidth, height: window.innerHeight})
      }
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
  }, [])
    

    useEffect(() => {
        if (gameStarted && !paused) {
            const randomNumber: number = Math.floor(Math.random() * 10) + 1;
            setTargetNumber(randomNumber);
        }
    }, [gameStarted, paused]);


    const handleStartGame = (): void => {
        setGameStarted(true);
        setGameOver(false);
        setAttempts(1);
        setPaused(false);
    };


    const handlePauseGame = (): void => {
        setPaused(true);
    };

    const handleResumeGame = (): void => {
        setPaused(false);
    };


    const handleGuess = (): void => {
        if (typeof userGuess === "number" && userGuess === targetNumber) {
            setGameOver(true);
        } else {
            setAttempts(attempts + 1);
        }
    };


    const handleTryAgain = (): void => {
        setGameStarted(false);
        setGameOver(false);
        setUserGuess("");
        setAttempts(0);
    };


    const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setUserGuess(parseInt(e.target.value));
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-300 to-yellow-300">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md bg-gradient-to-br from-green-200 to-yellow-200">
            <h1 className="text-3xl font-bold text-center mb-2 text-black">
              Number Guessing Game
            </h1>
            <p className="text-center text-black mb-4">
              Try to guess the number between 1 and 10!
            </p>
            {!gameStarted && (
              <div className="flex justify-center mb-4">
                <Button
                  onClick={handleStartGame}
                  className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Start Game
                </Button>
              </div>
            )}
            {gameStarted && !gameOver && (
              <div>
                <div className="flex justify-center mb-4">
                  {paused ? (
                    <Button
                      onClick={handleResumeGame}
                      className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Resume
                    </Button>
                  ) : (
                    <Button
                      onClick={handlePauseGame}
                      className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Pause
                    </Button>
                  )}
                </div>
                <div className="flex justify-center mb-4">
                  <Input
                    type="number"
                    value={userGuess}
                    onChange={handleUserGuessChange}
                    className="text-black bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs focus:border-black"
                    placeholder="Enter your guess"
                  />
                  <Button
                    onClick={handleGuess}
                    className="bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-4"
                  >
                    Guess
                  </Button>
                </div>
                <div className="text-center text-black">
                  <p>Attempts: {attempts}</p>
                </div>
              </div>
            )}
            {gameOver && (
              <div>
                <div className="text-center mb-4 text-black">
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={800}
                    colors={confettiColors}
                />
                  <h2 className="text-2xl font-bold">Game Over!</h2>
                  <p>You guessed the number in {attempts} attempts.</p>
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={handleTryAgain}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
}
