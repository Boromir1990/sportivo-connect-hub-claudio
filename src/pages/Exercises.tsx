
import React, { useState } from 'react';
import { TrainingExercise } from '@/types';
import { mockExercises } from '@/data/mockData';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Dumbbell, Filter, Search, Video } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const exerciseCategories = [
  { value: "all", label: "Tutti" },
  { value: "technical", label: "Tecnici" },
  { value: "tactical", label: "Tattici" },
  { value: "physical", label: "Fisici" },
  { value: "goalkeeper", label: "Portieri" }
];

// Function to get category badge color classes
const getCategoryColorClass = (category: string): string => {
  switch (category) {
    case "technical":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "tactical":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    case "physical":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "goalkeeper":
      return "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

// Function to get intensity badge variant
const getIntensityVariant = (intensity: string): string => {
  switch (intensity) {
    case "low":
      return "success";
    case "medium":
      return "warning";
    case "high":
      return "danger";
    default:
      return "outline";
  }
};

const ExercisesPage = () => {
  const [exercises, setExercises] = useState<TrainingExercise[]>(mockExercises);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedExercise, setSelectedExercise] = useState<TrainingExercise | null>(null);

  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         ex.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || ex.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectExercise = (exercise: TrainingExercise) => {
    setSelectedExercise(exercise);
  };
  
  const handleCreateExercise = () => {
    console.log("Create new exercise");
    // Here you would implement the creation functionality
  };
  
  const handleEditExercise = () => {
    console.log("Edit exercise:", selectedExercise);
    // Here you would implement the edit functionality
  };
  
  const handleAddToPlan = () => {
    console.log("Add to plan:", selectedExercise);
    // Here you would implement the add to plan functionality
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Esercitazioni</h1>
          <p className="text-muted-foreground">
            Catalogo completo di esercitazioni personalizzate per allenamenti
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filtri avanzati
          </Button>
          <Button onClick={handleCreateExercise}>Nuova esercitazione</Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Cerca esercitazione..." 
              className="pl-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-5 w-full">
              {exerciseCategories.map(category => (
                <TabsTrigger key={category.value} value={category.value}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredExercises.length > 0 ? filteredExercises.map((exercise) => (
              <Card 
                key={exercise.id} 
                className={`cursor-pointer border hover:border-primary/50 transition-all ${
                  selectedExercise?.id === exercise.id ? 'border-primary ring-1 ring-primary' : ''
                }`}
                onClick={() => handleSelectExercise(exercise)}
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between">
                    <Badge className={`capitalize ${getCategoryColorClass(exercise.category)}`}>
                      {exercise.category === "technical" ? "Tecnico" : 
                       exercise.category === "tactical" ? "Tattico" : 
                       exercise.category === "physical" ? "Fisico" : 
                       exercise.category === "goalkeeper" ? "Portiere" : 
                       exercise.category}
                    </Badge>
                    {exercise.intensity && (
                      <Badge variant={
                        exercise.intensity === 'high' ? 'destructive' : 
                        exercise.intensity === 'medium' ? 'default' : 
                        'outline'
                      } className={
                        exercise.intensity === 'high' ? 'bg-red-500' : 
                        exercise.intensity === 'medium' ? 'bg-orange-500' : 
                        exercise.intensity === 'low' ? 'bg-green-500' : ''
                      }>
                        {exercise.intensity === 'high' ? 'Difficile' : 
                         exercise.intensity === 'medium' ? 'Media' : 
                         exercise.intensity === 'low' ? 'Facile' : 
                         exercise.intensity}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{exercise.name || exercise.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">{exercise.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {exercise.duration} min
                  </div>
                  {exercise.videoUrl && (
                    <div className="flex items-center">
                      <Video className="h-4 w-4 mr-1" />
                      Video
                    </div>
                  )}
                </CardFooter>
              </Card>
            )) : (
              <div className="col-span-full text-center py-8">
                <p>Nessuna esercitazione trovata con questi criteri di ricerca.</p>
              </div>
            )}
          </div>
        </div>

        {selectedExercise && (
          <div className="lg:w-2/5 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{selectedExercise.name || selectedExercise.title}</CardTitle>
                <CardDescription>
                  <div className="flex gap-2 mt-1">
                    <Badge className={`capitalize ${getCategoryColorClass(selectedExercise.category)}`}>
                      {selectedExercise.category === "technical" ? "Tecnico" : 
                       selectedExercise.category === "tactical" ? "Tattico" : 
                       selectedExercise.category === "physical" ? "Fisico" : 
                       selectedExercise.category === "goalkeeper" ? "Portiere" : 
                       selectedExercise.category}
                    </Badge>
                    {selectedExercise.intensity && (
                      <Badge variant={
                        selectedExercise.intensity === 'high' ? 'destructive' : 
                        selectedExercise.intensity === 'medium' ? 'default' : 
                        'outline'
                      } className={
                        selectedExercise.intensity === 'high' ? 'bg-red-500' : 
                        selectedExercise.intensity === 'medium' ? 'bg-orange-500' : 
                        selectedExercise.intensity === 'low' ? 'bg-green-500' : ''
                      }>
                        {selectedExercise.intensity === 'high' ? 'Difficile' : 
                         selectedExercise.intensity === 'medium' ? 'Media' : 
                         selectedExercise.intensity === 'low' ? 'Facile' : 
                         selectedExercise.intensity}
                      </Badge>
                    )}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Descrizione</h3>
                  <p className="text-sm text-muted-foreground">{selectedExercise.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Durata</p>
                      <p className="font-medium">{selectedExercise.duration} min</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Intensità</p>
                      <p className="font-medium capitalize">{selectedExercise.intensity || 'Media'}</p>
                    </div>
                  </div>
                </div>
                
                {selectedExercise.videoUrl && (
                  <div>
                    <h3 className="font-medium mb-2">Video dimostrazione</h3>
                    <div className="aspect-video w-full bg-muted rounded-md flex items-center justify-center">
                      <Video className="h-8 w-8 text-muted-foreground" />
                      <span className="ml-2">Anteprima video</span>
                    </div>
                  </div>
                )}
                
                {selectedExercise.instructions && selectedExercise.instructions.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-1">Istruzioni</h3>
                    <ol className="list-decimal list-inside space-y-1">
                      {selectedExercise.instructions.map((instruction, i) => (
                        <li key={i} className="text-sm">{instruction}</li>
                      ))}
                    </ol>
                  </div>
                )}
                
                {selectedExercise.equipment && selectedExercise.equipment.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-1">Attrezzatura</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedExercise.equipment.map((item, i) => (
                        <Badge key={i} variant="outline">{item}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleEditExercise}>Modifica</Button>
                <Button onClick={handleAddToPlan}>Aggiungi a piano</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisesPage;
