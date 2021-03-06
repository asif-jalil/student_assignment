module.exports = (sequelize, DataTypes) => {
	const Submission = sequelize.define(
		"submission",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			assignmentId: {
				allowNull: false,
				references: {
					key: "id",
					model: "assignments"
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
				type: DataTypes.INTEGER
			},
			submittedBy: {
				allowNull: false,
				references: {
					key: "id",
					model: "users"
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
				type: DataTypes.INTEGER
			},
			file: {
				allowNull: true,
				type: DataTypes.STRING(255)
			},
			link: {
				allowNull: true,
				type: DataTypes.STRING(255)
			},
			updatedAt: {
				allowNull: false,
				field: "submissionDate",
				type: DataTypes.DATE
			}
		},
		{
			tableName: "submissions",
			timestamps: true,
			createdAt: false
		}
	);

	Submission.associate = models => {
		Submission.belongsTo(models.assignment, {
			foreignKey: "assignmentId",
			otherKey: "id",
			as: "assignment"
		});

		Submission.hasOne(models.gradeSheet, {
			foreignKey: "submissionId",
			otherKey: "id",
			as: "grade"
		});
	};

	return Submission;
};
