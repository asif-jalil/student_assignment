"use strict";

const seq = require("sequelize");

module.exports = {
	/**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(
			"users",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER
				},
				name: {
					allowNull: true,
					type: Sequelize.STRING(100)
				},
				email: {
					allowNull: false,
					type: Sequelize.STRING(100),
					unique: true
				},
				password: {
					allowNull: false,
					type: Sequelize.STRING
				},
				status: {
					allowNull: false,
					type: Sequelize.ENUM(["banned", "approved"]),
					defaultValue: "approved"
				},
				role: {
					allowNull: false,
					type: Sequelize.ENUM(["admin", "mentor", "student"]),
					defaultValue: "student"
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE
				}
			},
			{
				charset: "utf8mb4",
				collate: "utf8mb4_bin"
			}
		);

		await queryInterface.addIndex("users", {
			fields: ["role"]
		});
	},

	/**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("users");
	}
};
