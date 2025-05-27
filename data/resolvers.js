import { Widgets } from './dbConnectors';

const resolvers = {
  getProduct: async ({ id }) => {
    try {
      const product = await Widgets.findById(id);
      return product;
    } catch (error) {
      throw new Error(error);
    }
  },
  createProduct: async ({ input }) => {
    const newWidget = new Widgets({
      name: input.name,
      description: input.description,
      price: input.price,
      soldout: input.soldout,
      inventory: input.inventory,
      stores: input.stores,
    });

    newWidget.id = newWidget._id;

    try {
      await newWidget.save();
      return newWidget;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateProduct: async ({ input }) => {
    try {
      const updateWidget = await Widgets.findOneAndUpdate(
        { _id: input.id },
        input,
        { new: true }
      );
      return updateWidget;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteProduct: async ({ id }) => {
    try {
      const deleteWidget = await Widgets.deleteOne({ _id: id });
      return 'Successfully deleted widget';
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default resolvers;
