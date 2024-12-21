@extends('admin.layouts.app')

@section('title')
    Edit definition
@endsection

@section('content')
    <div class="row my-5">
        <div class="col-md-3">
            @include('admin.layouts.sidebar')
        </div>
        <div class="col-md-9">
            <div class="card">
                <div class="card-header bg-white">
                    <h3 class="mt-2">
                        Edit definition
                    </h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 mx-auto">
                            <form action="{{route('admin.definitions.update',$definition->id)}}" method="post">
                                @csrf
                                @method("PUT")
                                <div class="mb-3">
                                    <label for="word_id" class="form-label">Word*</label>
                                    <select
                                        class="form-select @error('word_id') is-invalid @enderror"
                                        name="word_id"
                                        id="word_id"
                                    >
                                        <option selected disabled value="">Select one word</option>
                                        @foreach ($words as $word)
                                            <option value="{{$word->id}}"
                                                @selected(old('word_id',$definition->word_id) == $word->id)
                                                >{{$word->name}}</option>
                                        @endforeach
                                    </select>
                                    @error('word_id')
                                        <div class="invalid-feedback">
                                            <strong> {{ $message }} </strong>
                                        </div>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="meaning" class="form-label">Meaning*</label>
                                    <textarea
                                        rows="3"
                                        class="form-control @error('meaning') is-invalid @enderror"
                                        name="meaning"
                                        id="meaning"
                                        placeholder="Meaning*"
                                    >{{old('meaning',$definition->meaning)}}</textarea>
                                    @error('meaning')
                                        <div class="invalid-feedback">
                                            <strong> {{ $message }} </strong>
                                        </div>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="part_of_speech" class="form-label">Part of speech*</label>
                                    <input
                                        type="text"
                                        class="form-control @error('part_of_speech') is-invalid @enderror"
                                        name="part_of_speech"
                                        id="part_of_speech"
                                        placeholder="Part of speech*"
                                        value="{{old('part_of_speech',$definition->part_of_speech)}}"
                                    />
                                    @error('part_of_speech')
                                        <div class="invalid-feedback">
                                            <strong> {{ $message }} </strong>
                                        </div>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="example_sentence" class="form-label">Example*</label>
                                    <textarea
                                        rows="3"
                                        class="form-control @error('example_sentence') is-invalid @enderror"
                                        name="example_sentence"
                                        id="example_sentence"
                                        placeholder="Example*"
                                    >{{old('example_sentence',$definition->example_sentence)}}</textarea>
                                    @error('example_sentence')
                                        <div class="invalid-feedback">
                                            <strong> {{ $message }} </strong>
                                        </div>
                                    @enderror
                                </div>
                                <button
                                    type="submit"
                                    class="btn btn-dark btn-sm"
                                >
                                Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection