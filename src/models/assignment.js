module.exports = (sequelize, DataTypes) => {
	const Assignment = sequelize.define(
		"assignment",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			title: {
				allowNull: false,
				type: DataTypes.STRING(255)
			},
			description: {
				allowNull: true,
				type: DataTypes.TEXT
			},
			mentor: {
				allowNull: false,
				references: {
					key: "id",
					model: "users"
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
				type: DataTypes.INTEGER
			},
			deadline: {
				allowNull: false,
				type: DataTypes.DATE
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE
			}
		},
		{
			tableName: "assignments",
			timestamps: true,
			updatedAt: false
		}
	);

	Assignment.associate = models => {
		Assignment.belongsTo(models.user, {
			foreignKey: "mentor",
			otherKey: "id"
		});
	};

	return Assignment;
};
