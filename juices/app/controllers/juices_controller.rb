class JuicesController < ApplicationController
  before_action :set_juice, only: [:show, :update, :destroy]

  # GET /juices
  def index
    @juices = Juice.all

    render json: @juices
  end

  # GET /juices/1
  def show
    render json: @juice
  end

  # POST /juices
  def create
    @juice = Juice.new(juice_params)

    if @juice.save
      render json: @juice, status: :created, location: @juice
    else
      render json: @juice.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /juices/1
  def update
    if @juice.update(juice_params)
      render json: @juice
    else
      render json: @juice.errors, status: :unprocessable_entity
    end
  end

  # DELETE /juices/1
  def destroy
    @juice.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_juice
      @juice = Juice.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def juice_params
      params.require(:juice).permit(:name, :sugar)
    end
end
