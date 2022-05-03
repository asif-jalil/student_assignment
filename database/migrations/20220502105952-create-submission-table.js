"use strict";

const seq = require("sequelize");
const assignment = require("../../src/models/assignment");

module.exports = {
	/**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"submissions",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER
				},
				assignmentId: {
					allowNull: false,
					references: {
						key: "id",
						model: "assignments"
					},
					onDelete: "CASCADE",
					onUpdate: "CASCADE",
					type: Sequelize.INTEGER
				},
				submittedBy: {
					allowNull: false,
					references: {
						key: "id",
						model: "users"
					},
					onDelete: "CASCADE",
					onUpdate: "CASCADE",
					type: Sequelize.INTEGER
				},
				file: {
					allowNull: true,
					type: Sequelize.STRING(255)
				},
				link: {
					allowNull: true,
					type: Sequelize.STRING(255)
				},
				createdAt: {
					allowNull: false,
					field: "submissionDate",
					type: Sequelize.DATE
				}
			},
			{
				charset: "utf8mb4",
				collate: "utf8mb4_bin"
			}
		);

		await queryInterface.addIndex("submission", {
			fields: ["assignmentId", "submittedBy"],
			unique: true
		});
	},

	/**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("submissions");
	}
};
