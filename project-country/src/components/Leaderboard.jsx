import React, { useState } from "react";
import { Link } from "react-router-dom";

const leaderboardData = {
	Easy: [
		{ id: 1, name: "Emma", score: 18 },
		{ id: 2, name: "Noah", score: 16 },
		{ id: 3, name: "Olivia", score: 14 },
		{ id: 4, name: "Liam", score: 12 },
		{ id: 5, name: "Ava", score: 10 },
	],
	Tough: [
		{ id: 1, name: "Mia", score: 13 },
		{ id: 2, name: "James", score: 12 },
		{ id: 3, name: "Charlotte", score: 10 },
		{ id: 4, name: "Benjamin", score: 9 },
		{ id: 5, name: "Amelia", score: 7 },
	],
	Hard: [
		{ id: 1, name: "Lucas", score: 9 },
		{ id: 2, name: "Sophia", score: 8 },
		{ id: 3, name: "Henry", score: 7 },
		{ id: 4, name: "Evelyn", score: 6 },
		{ id: 5, name: "Jack", score: 5 },
	],
};

const difficulties = ["Easy", "Tough", "Hard"];

const Leaderboard = () => {
	const [activeDifficulty, setActiveDifficulty] = useState("Easy");
	const activeLeaderboard = leaderboardData[activeDifficulty];

	return (
		<div className="min-h-screen bg-linear-to-b from-sky-50 via-white to-blue-50 px-4 py-8">
			<div className="mx-auto w-full max-w-3xl rounded-2xl border border-blue-200/80 bg-white/90 p-5 shadow-[0_16px_45px_rgba(30,64,175,0.14)] backdrop-blur-md md:p-7">
				<div className="mb-5 flex items-center justify-between">
					<h1 className="text-2xl font-extrabold text-blue-950 md:text-3xl">
						Leaderboard
					</h1>
					<Link
						to="/"
						className="rounded-xl border border-blue-300 bg-white px-3 py-2 text-sm font-semibold text-blue-800 transition hover:border-blue-500"
					>
						Back to Game
					</Link>
				</div>

				<div className="mb-4 rounded-xl border border-blue-100 bg-blue-50 p-1">
					<div className="grid grid-cols-3 gap-1">
						{difficulties.map((difficulty) => (
							<button
								key={difficulty}
								onClick={() => setActiveDifficulty(difficulty)}
								className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
									activeDifficulty === difficulty
										? "bg-white text-blue-900 shadow-sm"
										: "text-blue-700 hover:bg-blue-100"
								}`}
							>
								{difficulty}
							</button>
						))}
					</div>
				</div>

				<div className="rounded-2xl border border-blue-100 overflow-hidden">
					<div className="grid grid-cols-12 bg-blue-50 px-4 py-3 text-xs font-semibold tracking-wide text-blue-800 uppercase">
						<p className="col-span-2">Rank</p>
						<p className="col-span-5">Player</p>
						<p className="col-span-5 text-center">Score</p>
					</div>

					{activeLeaderboard.map((player, index) => (
						<div
							key={`${activeDifficulty}-${player.id}`}
							className="grid grid-cols-12 items-center border-t border-blue-100 px-4 py-3"
						>
							<p className="col-span-2 font-bold text-blue-900">#{index + 1}</p>
							<p className="col-span-5 font-semibold text-slate-800">{player.name}</p>
							<p className="col-span-5 text-center font-bold text-blue-700">
								{player.score}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Leaderboard;
