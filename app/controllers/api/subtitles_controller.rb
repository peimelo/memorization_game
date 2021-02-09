class Api::SubtitlesController < ApplicationController
  before_action :authenticate_with_token
  before_action :set_subtitle, only: %i[show update destroy]

  # GET /subtitles
  def index
    @subtitles = Subtitle.all

    render json: @subtitles
  end

  # GET /subtitles/1
  def show
    render json: @subtitle
  end

  # POST /subtitles
  def create
    @category = Category.find(params[:category_id])
    @subtitle = @category.subtitles.new(subtitle_params)

    if @subtitle.save
      render json: @subtitle, status: :created, location: api_subtitle_url(@subtitle)
    else
      render json: @subtitle.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /subtitles/1
  def update
    if @subtitle.update(subtitle_params)
      render json: @subtitle
    else
      render json: @subtitle.errors, status: :unprocessable_entity
    end
  end

  # DELETE /subtitles/1
  def destroy
    @subtitle.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_subtitle
    @subtitle = Subtitle.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def subtitle_params
    params.require(:subtitle).permit(:name)
  end
end
