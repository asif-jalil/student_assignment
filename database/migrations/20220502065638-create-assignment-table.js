"use strict";

const seq = require("sequelize");

module.exports = {
	/**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(
			"assignments",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER
				},
				title: {
					allowNull: false,
					type: Sequelize.STRING(255)
				},
				description: {
					allowNull: true,
					type: Sequelize.TEXT
				},
				mentor: {
					allowNull: false,
					references: {
						key: "id",
						model: "users"
					},
					onDelete: "CASCADE",
					onUpdate: "CASCADE",
					type: Sequelize.INTEGER
				},
				deadline: {
					allowNull: false,
					type: Sequelize.DATE
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE
				}
			},
			{
				charset: "utf8mb4",
				collate: "utf8mb4_bin"
			}
		);
	},

	/**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("assignments");
	}
};
