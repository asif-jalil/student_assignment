"use strict";

const seq = require("sequelize");

module.exports = {
	/**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("gradeSheets", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			submissionId: {
				allowNull: false,
				references: {
					key: "id",
					model: "submissions"
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
				type: Sequelize.INTEGER
			},
			mark: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			remark: {
				allowNull: true,
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},

	/**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("gradeSheets");
	}
};
