module.exports = (sequelize, type) => {
    itensLicitacao = sequelize.define(
        "item",
        {
            id_item: {
                type: type.STRING,
                primaryKey: true
            },
            id_licitacao: type.STRING,
            id_orgao: type.INTEGER,
            nr_licitacao: type.INTEGER,
            ano_licitacao: type.INTEGER,
            cd_tipo_modalidade: type.STRING,
            nr_lote: type.INTEGER,
            nr_item: type.INTEGER,
            ds_item: type.STRING,
            qt_itens_licitacao: type.INTEGER,
            sg_unidade_medida: type.STRING,
            vl_unitario_estimado: type.DECIMAL(15, 2),
            vl_total_estimado: type.DECIMAL(15, 2)
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );

    itensLicitacao.associate = function (models) {
        itensLicitacao.belongsTo(models.orgao, {
            foreignKey: "id_orgao",
            sourceKey: "id_orgao",
            as: "itensLicitacoesOrgao"
        });
        itensLicitacao.belongsTo(models.licitacao, {
            foreignKey: "id_licitacao",
            sourceKey: "id_licitacao",
            as: "licitacaoItensLicitacao"
        });
        itensLicitacao.hasOne(models.itensContrato, {
            foreignKey: "id_item_licitacao",
            targetKey: "id_item",
            as: "itensLicitacaoContrato"
        });
    };
    return itensLicitacao;
}