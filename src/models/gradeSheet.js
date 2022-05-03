module.exports = (sequelize, DataTypes) => {
	const GradeSheet = sequelize.define(
		"gradeSheet",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			submissionId: {
				allowNull: false,
				references: {
					key: "id",
					model: "submissions"
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
				type: DataTypes.INTEGER
			},
			mark: {
				allowNull: false,
				type: DataTypes.INTEGER
			},
			remark: {
				allowNull: true,
				type: DataTypes.STRING
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE
			}
		},
		{
			tableName: "gradeSheets",
			timestamps: true,
			updatedAt: false
		}
	);

	GradeSheet.associate = models => {
		GradeSheet.belongsTo(models.submission, {
			foreignKey: "submissionId",
			otherKey: "id",
			as: "submission"
		});
	};

	return GradeSheet;
};
