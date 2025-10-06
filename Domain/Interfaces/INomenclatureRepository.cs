using Domain.DAL.Nomenclatures;
using Domain.Entities;

namespace Domain.Interfaces
{
	public interface INomenclatureRepository
	{
		ICollection<Nomenclature> GetCollection(GetNomenclatureListRequest request);

		Nomenclature GetNomenclature(int nomenclatureId);
	}
}
