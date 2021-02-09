class Api::CategoriesController < ApplicationController
  before_action :authenticate_with_token, except: %i[index show]
  before_action :set_category, only: %i[show update destroy]

  # GET /categories
  def index
    @categories = Category.order(:name).arrange_serializable do |parent|
      {
        id: parent.id,
        name: parent.name
      }
    end

    render json: @categories
  end

  # GET /categories/1
  def show
    render json: @category
  end

  # PATCH/PUT /categories/1
  def update
    if @category.update(category_params)
      render json: @category
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # DELETE /categories/1
  def destroy
    @category.destroy
  end

  # POST /categories
  def import
    Category.import(params[:file])
    render json: { message: 'Import performed successfully.' }
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_category
    @category = Category.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def category_params
    params.require(:category).permit(:name)
  end
end
